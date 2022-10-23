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
exports.authRoute = void 0;
const express_1 = require("express");
const auth_service_1 = require("../domains/auth-service");
const jwy_servive_1 = require("../domains/jwy-servive");
const middleWares_1 = require("../middleWares/middleWares");
exports.authRoute = (0, express_1.Router)({});
exports.authRoute.post('/registration', middleWares_1.loginValidator, middleWares_1.passwordValidator, middleWares_1.emailValidator, middleWares_1.emailDuplicationValidator, middleWares_1.loginDuplicationValidator, middleWares_1.errorMiddleWAre, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { login, password, email } = req.body;
    const currentUser = yield auth_service_1.authService.registerUser({ email, login, password });
    if (!currentUser)
        return res.sendStatus(404);
    res.sendStatus(204);
}));
exports.authRoute.post('/registration-confirmation', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.body;
    const result = yield auth_service_1.authService.confirmEmail({ code });
    if (result) {
        return res.sendStatus(204);
    }
    else {
        return res.sendStatus(404);
    }
}));
exports.authRoute.post('/registration-email-resending', middleWares_1.emailValidator, middleWares_1.errorMiddleWAre, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const result = yield auth_service_1.authService.resendEmail({ email });
    if (result) {
        return res.sendStatus(204);
    }
    else {
        return res.sendStatus(404);
    }
}));
exports.authRoute.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { login, password } = req.body;
    const authResult = yield auth_service_1.authService.authUser({ login, password });
    if (authResult) {
        const token = yield jwy_servive_1.jwtService.createJwt(authResult);
        res.status(200).send(token.data);
    }
    else {
        res.sendStatus(401);
    }
}));
exports.authRoute.get('/me', middleWares_1.authMiddleWare, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { login, id, email } = req.user;
    res.status(200).send({
        email,
        login,
        userId: id,
    });
}));
//# sourceMappingURL=auth-route.js.map