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