"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizationMiddleWare = exports.errorMiddleWAre = exports.bloggerIdValidator = exports.contentValidator = exports.descriptionValidator = exports.titleValidator = exports.nameValidator = exports.urlValidator = void 0;
const { body, validationResult } = require('express-validator');
exports.urlValidator = body('youtubeUrl').trim().isURL().isLength({ min: 3, max: 100 });
exports.nameValidator = body('name').trim().isLength({ min: 3, max: 15 });
exports.titleValidator = body('title').trim().isLength({ min: 3, max: 30 });
exports.descriptionValidator = body('shortDescription').trim().isLength({ min: 3, max: 100 });
exports.contentValidator = body('content').trim().isLength({ min: 3, max: 1000 });
exports.bloggerIdValidator = body('bloggerId').trim().isInt().isLength({ min: 1, max: 30 });
const errorMiddleWAre = (req, res, next) => {
    const errors = validationResult(req).errors;
    const isEmpty = validationResult(req).isEmpty();
    if (!isEmpty) {
        const errorsWithoutDuplicate = errors.filter((item, index) => {
            const duplicate = errors.find((el, i) => (i < index && el.param === item.param));
            return !duplicate;
        });
        const errorMessage = errorsWithoutDuplicate.map((item) => {
            return { message: `${item.param} incorrect`, field: item.param };
        });
        return res.status(400).send({ errorsMessages: errorMessage });
    }
    next();
};
exports.errorMiddleWAre = errorMiddleWAre;
const authorizationMiddleWare = (req, res, next) => {
    console.log(req.headers.authorization, 'req.headers.authorization');
    if (!req.headers.authorization || req.headers.authorization !== 'Basic YWRtaW46cXdlcnR5') {
        return res.sendStatus(401);
    }
    else {
        return next();
    }
};
exports.authorizationMiddleWare = authorizationMiddleWare;
//# sourceMappingURL=middleWares.js.map