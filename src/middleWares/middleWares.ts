import {NextFunction, Request, Response} from "express";
import {bloggersRepository} from "../Repositories/bloggers-repository";
import {jwtService} from "../services/jwy-servive";
import {queryBloggersRepository} from "../Repositories/queryReposotories/query-bloggers-repository";
import {queryUsersRepository} from "../Repositories/queryReposotories/query-users-repository";

const {body, validationResult} = require('express-validator');

export const urlValidator = body('youtubeUrl').trim().isURL().isLength({min: 3, max: 100});
export const nameValidator = body('name').trim().isLength({min: 3, max: 15});
export const loginValidator = body('login').trim().isLength({min: 3, max: 10});
export const passwordValidator = body('password').trim().isLength({min: 6, max: 20});
export const emailValidator = body('email').trim().isEmail().isLength({min: 3});
export const titleValidator = body('title').trim().isLength({min: 3, max: 30})
export const descriptionValidator = body('shortDescription').trim().isLength({min: 3, max: 100})
export const contentValidator = body('content').trim().isLength({min: 3, max: 1000})
export const contentCommentValidator = body('content').trim().isLength({min: 20, max: 300})
export const bloggerIdValidator = body('blogId').trim().isLength({min: 1, max: 30}).custom(async (value: string) => {
    const currentBlogger = await bloggersRepository.getCurrentBlogger(value)
    if (!currentBlogger) {
        throw new Error('Not found this blogger');
    } else {
        return true
    }
})


export const errorMiddleWAre = (req: Request, res: Response, next: NextFunction) => {
    const errors: any[] = validationResult(req).errors;
    const isEmpty = validationResult(req).isEmpty();

    if (!isEmpty) {
        const errorsWithoutDuplicate = errors.filter((item: any, index: number) => {
            const duplicate = errors.find((el, i) => (i < index && el.param === item.param));
            return !duplicate;
        })
        const errorMessage = errorsWithoutDuplicate.map((item: any) => {
            return {message: `${item.param} incorrect`, field: item.param}
        });


        return res.status(400).send({errorsMessages: errorMessage});
    }
    next()
};

export const authorizationMiddleWare = (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization || req.headers.authorization !== 'Basic YWRtaW46cXdlcnR5') {
        return res.sendStatus(401);
    } else {
        return next()
    }
}

export const authMiddleWare = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
        return res.sendStatus(401);
    }
    const token = req.headers.authorization.split(' ')[1];

    const userId = await jwtService.getUserIdNyToken(token)

    if (userId) {
        req.user = await queryUsersRepository.getCurrentUser(userId)
        return next()
    }
    return res.send(401)
}