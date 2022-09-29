import {Request, Response, Router} from "express";
import {queryUsersRepository} from "../Repositories/queryReposotories/query-users-repository";
import {CreateUserRequestBodyType, GetUsersParamsRequestType, UserWithPasswordType} from "../interfaces/interfaces";
import {
    authorizationMiddleWare,
    emailValidator,
    errorMiddleWAre,
    loginValidator,
    passwordValidator
} from "../middleWares/middleWares";
import {usersService} from "../services/users-service";


export const usersRoute = Router({});

usersRoute.get('/', async (req: Request<{}, {}, {}, GetUsersParamsRequestType>, res: Response) => {
    const {pageNumber, pageSize, sortBy, sortDirection, searchEmailTerm, searchLoginTerm} = req.query;
    console.log(searchEmailTerm,'searchEmailTerm')
    console.log(searchLoginTerm,'searchLoginTerm')
    const currentUser = await queryUsersRepository.getUsers({
        pageNumber: pageNumber ? Number(pageNumber) : 1,
        pageSize: pageSize ? Number(pageSize) : 10,
        sortBy: sortBy ? sortBy : 'createdAt',
        sortDirection: sortDirection ? sortDirection : 'desc',
        searchLoginTerm: searchLoginTerm || '',
        searchEmailTerm: searchEmailTerm || '',
    })

    if (currentUser) {
        res.status(200).send(currentUser)
    } else {
        res.sendStatus(404)
    }
})

usersRoute.post('/', loginValidator, passwordValidator, emailValidator,authorizationMiddleWare, errorMiddleWAre, async (req: Request<{}, {}, UserWithPasswordType, {}>, res: Response) => {

    const {email, login, password} = req.body

    const currentUser = await usersService.createUser({email, login, password})
    console.log(currentUser,'currentUser')
    if (currentUser) {
        res.status(201).send(currentUser)
    } else {
        res.sendStatus(404)
    }
})

usersRoute.delete('/:userId', authorizationMiddleWare,async (req: Request, res: Response) => {
    const {userId} = req.params;
    const result = await queryUsersRepository.deleteUser(userId);

    if (result) {
        res.sendStatus(204)
    } else {
        res.sendStatus(404)
    }

})