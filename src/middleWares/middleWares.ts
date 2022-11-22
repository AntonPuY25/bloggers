import {NextFunction, Request, Response} from "express";
import {bloggersRepository} from "../Repositories/bloggers-repository";
import {jwtService} from "../domains/jwy-servive";
import {queryUsersRepository} from "../Repositories/queryReposotories/query-users-repository";
import dayjs from 'dayjs'
import {requestLimitsService} from "../domains/request-limits-service";

const {body, validationResult} = require('express-validator');

export const urlValidator = body('websiteUrl').trim().isURL().isLength({min: 3, max: 100});
export const nameValidator = body('name').trim().isLength({min: 3, max: 15});
export const loginValidator = body('login').trim().isLength({min: 3, max: 10});
export const passwordValidator = body('password').trim().isLength({min: 6, max: 20});
export const emailValidator = body('email').trim().isEmail().isLength({min: 3});
export const titleValidator = body('title').trim().isLength({min: 3, max: 30})
export const descriptionValidator = body('shortDescription').trim().isLength({min: 3, max: 100})
export const contentValidator = body('content').trim().isLength({min: 3, max: 1000})
export const contentCommentValidator = body('content').trim().isLength({min: 20, max: 300})
export const codeValidator = body('code').trim().isLength({min: 1});

export const bloggerIdValidator = body('blogId').trim().isLength({min: 1, max: 30})
    .custom(async (value: string) => {
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

        return res.status(400).send({
            errorsMessages: errorMessage
        });
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
    const userId = await jwtService.getUserIdByToken(token)


    if (userId) {
        const currentUser = await queryUsersRepository.getCurrentUser(userId);
        if (currentUser) {
            req.user = currentUser
            return next()
        } else {
            return res.sendStatus(403)
        }
    }

    return res.sendStatus(401)
}

export const checkRequestLimitsMiddleWare = async (req: Request, res: Response, next: NextFunction) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const date = dayjs().toDate();

    if (typeof ip != 'string') throw new Error('Sorry, but your Ip-address is not correct');

    const currentLimit = {
        ip,
        date
    }

    const createdLimit = await requestLimitsService.setRequestLimit(currentLimit)

    if (!createdLimit) throw new Error('Sorry, but something went wrong');

    const createdLimited = await requestLimitsService.getLimitsByIp(currentLimit)

    if (!createdLimited) next()

    if (createdLimited) {
        const currentLimited = createdLimited
            .filter((limit: any) => !(dayjs().subtract(10, 's') > dayjs(limit.date)));
        if(currentLimited.length > 4){
            return res.sendStatus(429);
        }else{
            next()
        }
    }
}
