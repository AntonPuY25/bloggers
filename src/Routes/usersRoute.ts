import {Request, Response, Router} from "express";
import {queryUsersRepository} from "../Repositories/queryReposotories/query-users-repository";
import {GetUsersParamsRequestType, UserWithPasswordType} from "../interfaces/interfaces";
import {
    authorizationMiddleWare,
    emailValidator,
    errorMiddleWAre,
    loginValidator,
    passwordValidator
} from "../middleWares/middleWares";
import {duplicatedEmail, duplicatedLogin, getUsersData} from "../helpers/helpers";
import {GetUsersDataType} from "../helpers/types";
import {authService} from "../domains/auth-service";


export const usersRoute = Router({});

usersRoute.get('/',
    async (req: Request<{}, {}, {},
        GetUsersParamsRequestType>, res: Response) => {

        const {
            pageNumber, pageSize, sortBy,
            sortDirection, searchEmailTerm, searchLoginTerm
        } = req.query;

        const currentUser = await queryUsersRepository.getUsers(
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
    })

usersRoute.post('/',authorizationMiddleWare, loginValidator, passwordValidator, emailValidator, errorMiddleWAre,
    async (req: Request<{}, {}, UserWithPasswordType, {}>, res: Response) => {
        const {email, login, password} = req.body

        const isDuplicatedEmail = await duplicatedEmail(email)
        const isDuplicatedLogin = await duplicatedLogin(login)

        if (isDuplicatedEmail) return res.status(400).send(isDuplicatedEmail)
        if (isDuplicatedLogin) return res.status(400).send(isDuplicatedLogin)

        const currentUser = await authService.registerUser(
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
    })

usersRoute.delete('/:userId',
    async (req: Request, res: Response) => {

        const {userId} = req.params;
        const result = await queryUsersRepository.deleteUser(userId);

        if (result) {
            res.sendStatus(204)
        } else {
            res.sendStatus(404)
        }
    })