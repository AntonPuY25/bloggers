const {body, validationResult} = require('express-validator');
import {NextFunction, Request, Response} from "express";

export const urlValidator = body('youtubeUrl').trim().isURL().isLength({min: 3, max: 100});
export const nameValidator = body('name').trim().isLength({min: 3, max: 15});

export const titleValidator = body('title').trim().isLength({min: 3, max: 30})
export const descriptionValidator = body('shortDescription').trim().isLength({min: 3, max: 100})
export const contentValidator = body('content').trim().isLength({min: 3, max: 1000})
export const bloggerIdValidator = body('bloggerId').trim().isInt().isLength({min: 1, max: 30})


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
    if (req.headers.authorization !== 'Basic QWRtaW46cXdlcnQ= ') {
        return res.send(401);
    }
    next()

}