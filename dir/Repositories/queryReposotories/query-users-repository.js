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
exports.queryUsersRepository = void 0;
const users_scheme_1 = require("../../DB/users-scheme");
exports.queryUsersRepository = {
    getUsers({ pageNumber, pageSize, searchEmailTerm, searchLoginTerm, sortBy, sortDirection }) {
        return __awaiter(this, void 0, void 0, function* () {
            const findData = searchEmailTerm || searchLoginTerm ? {
                $or: [{ login: { $regex: searchLoginTerm, $options: '-i' } },
                    { email: { $regex: searchEmailTerm, $options: '-i' } }]
            } : {};
            const skipCount = (pageNumber - 1) * pageSize;
            const skipData = pageNumber ? skipCount : 0;
            const limitData = pageSize;
            const totalCount = yield users_scheme_1.UsersModel.find(findData).count();
            const pagesCount = Math.ceil(Number(totalCount) / pageSize) || 0;
            const sortCreateData = sortBy ? sortBy : 'createdAt';
            const sortDirectionData = sortDirection === 'asc' ? 1 : -1;
            return users_scheme_1.UsersModel.find(findData).skip(skipData).limit(limitData).sort({
                [sortCreateData]: sortDirectionData
            })
                .then((result) => {
                console.log(result, 'result');
                if (result.length) {
                    const items = result.reduce((acc, item) => {
                        const newUser = {
                            id: item.id,
                            email: item.email,
                            login: item.login,
                            createdAt: item.createdAt,
                        };
                        acc.push(newUser);
                        return acc;
                    }, []);
                    return {
                        pagesCount,
                        page: Number(pageNumber),
                        pageSize: Number(pageSize),
                        totalCount: Number(totalCount),
                        items,
                    };
                }
                else {
                    return {
                        pagesCount,
                        page: Number(pageNumber),
                        pageSize: Number(pageSize),
                        totalCount: Number(totalCount),
                        items: [],
                    };
                }
            })
                .catch(() => null);
        });
    },
    deleteUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = yield users_scheme_1.UsersModel.find({ id: userId });
            if (currentUser.length) {
                return users_scheme_1.UsersModel.deleteOne({ id: userId })
                    .then((result) => result)
                    .catch((error) => null);
            }
            else {
                return null;
            }
        });
    },
    getCurrentUser: (userId) => __awaiter(void 0, void 0, void 0, function* () {
        return users_scheme_1.UsersModel.findOne({ id: userId })
            .then((result) => result)
            .catch((error) => null);
    }),
};
//# sourceMappingURL=query-users-repository.js.map