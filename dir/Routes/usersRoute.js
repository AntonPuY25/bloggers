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
exports.usersRoute = void 0;
const express_1 = require("express");
const query_users_repository_1 = require("../Repositories/queryReposotories/query-users-repository");
const middleWares_1 = require("../middleWares/middleWares");
const users_service_1 = require("../services/users-service");
const helpers_1 = require("../helpers/helpers");
exports.usersRoute = (0, express_1.Router)({});
exports.usersRoute.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pageNumber, pageSize, sortBy, sortDirection, searchEmailTerm, searchLoginTerm } = req.query;
    const currentUser = yield query_users_repository_1.queryUsersRepository.getUsers((0, helpers_1.getUsersData)({
        pageSize,
        pageNumber,
        sortBy,
        sortDirection,
        searchEmailTerm,
        searchLoginTerm
    }));
    if (currentUser) {
        res.status(200).send(currentUser);
    }
    else {
        res.sendStatus(404);
    }
}));
exports.usersRoute.post('/', middleWares_1.loginValidator, middleWares_1.passwordValidator, middleWares_1.emailValidator, middleWares_1.authorizationMiddleWare, middleWares_1.errorMiddleWAre, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, login, password } = req.body;
    const currentUser = yield users_service_1.usersService.createUser({ email, login, password });
    if (currentUser) {
        res.status(201).send(currentUser);
    }
    else {
        res.sendStatus(404);
    }
}));
exports.usersRoute.delete('/:userId', middleWares_1.authorizationMiddleWare, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const result = yield query_users_repository_1.queryUsersRepository.deleteUser(userId);
    if (result) {
        res.sendStatus(204);
    }
    else {
        res.sendStatus(404);
    }
}));
//# sourceMappingURL=usersRoute.js.map