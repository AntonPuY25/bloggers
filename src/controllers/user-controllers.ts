import {QueryUsersRepository} from "../Repositories/queryReposotories/query-users-repository";
import {AuthService} from "../domains/auth-service";
import {Request, Response} from "express";
import {GetUsersParamsRequestType, UserWithPasswordType} from "../interfaces/interfaces";
import {duplicatedEmail, duplicatedLogin, getUsersData} from "../helpers/helpers";
import {GetUsersDataType} from "../helpers/types";

export class UserController {

    constructor(protected authService: AuthService,
                protected queryUsersRepository: QueryUsersRepository) {}

    async getUsers(req: Request<{}, {}, {},
        GetUsersParamsRequestType>, res: Response) {

        const {
            pageNumber, pageSize, sortBy,
            sortDirection, searchEmailTerm, searchLoginTerm
        } = req.query;

        const currentUser = await this.queryUsersRepository.getUsers(
            getUsersData({
                pageSize,
                pageNumber,
                sortBy,
                sortDirection,
                searchEmailTerm,
                searchLoginTerm
            } as GetUsersDataType)
        )

        if (currentUser) {
            res.status(200).send(currentUser)
        } else {
            res.sendStatus(404)
        }
    }

    async createUser(req: Request<{}, {}, UserWithPasswordType, {}>, res: Response) {
        const {email, login, password} = req.body

        const isDuplicatedEmail = await duplicatedEmail(email)
        const isDuplicatedLogin = await duplicatedLogin(login)

        if (isDuplicatedEmail) return res.status(400).send(isDuplicatedEmail)
        if (isDuplicatedLogin) return res.status(400).send(isDuplicatedLogin)

        const currentUser = await this.authService.registerUser(
            {email, login, password})

        if (currentUser) {
            res.status(201).send({
                id: currentUser.id,
                login: currentUser.userData.login,
                email: currentUser.userData.email,
                createdAt: currentUser.createdAt
            })
        } else {
            res.sendStatus(404)
        }
    }

    async deleteUser(req: Request, res: Response) {

        const {userId} = req.params;
        const result = await this.queryUsersRepository.deleteUser(userId);

        if (result) {
            res.sendStatus(204)
        } else {
            res.sendStatus(404)
        }
    }
}