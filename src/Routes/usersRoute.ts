import {Router} from "express";
import {
    authorizationMiddleWare,
    emailValidator,
    errorMiddleWAre,
    loginValidator,
    passwordValidator
} from "../middleWares/middleWares";
import {userController} from "../compositionRoots/compositions-root";


export const usersRoute = Router({});

usersRoute.get('/',
    userController.getUsers.bind(userController))

usersRoute.post('/', authorizationMiddleWare, loginValidator,
    passwordValidator, emailValidator, errorMiddleWAre,
    userController.createUser.bind(userController))

usersRoute.delete('/:userId',
    userController.deleteUser.bind(userController))