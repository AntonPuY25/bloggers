"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizationMiddleWare = exports.errorMiddleWAre = exports.bloggerIdValidator = exports.contentValidator = exports.descriptionValidator = exports.titleValidator = exports.nameValidator = exports.urlValidator = void 0;
const bloggers_repository_1 = require("../Repositories/bloggers-repository");
const { body, validationResult } = require('express-validator');
exports.urlValidator = body('youtubeUrl').trim().isURL().isLength({ min: 3, max: 100 });
exports.nameValidator = body('name').trim().isLength({ min: 3, max: 15 });
exports.titleValidator = body('title').trim().isLength({ min: 3, max: 30 });
exports.descriptionValidator = body('shortDescription').trim().isLength({ min: 3, max: 100 });
exports.contentValidator = body('content').trim().isLength({ min: 3, max: 1000 });
exports.bloggerIdValidator = body('bloggerId').trim().isLength({ min: 1, max: 30 }).custom((value) => __awaiter(void 0, void 0, void 0, function* () {
    const currentBlogger = yield bloggers_repository_1.bloggersRepository.getCurrentBlogger(value);
    if (!currentBlogger) {
        throw new Error('Not found this blogger');
    }
    else {
        return true;
    }
}));
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
    if (!req.headers.authorization || req.headers.authorization !== 'Basic YWRtaW46cXdlcnR5') {
        return res.sendStatus(401);
    }
    else {
        return next();
    }
};
exports.authorizationMiddleWare = authorizationMiddleWare;
//# sourceMappingURL=middleWares.js.map