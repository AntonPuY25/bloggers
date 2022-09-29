import {Request, Response, Router} from "express";
import {AuthRequestBodyType} from "../interfaces/interfaces";
import {authService} from "../services/auth-service";

export const authRoute = Router({});

authRoute.post('/login',  async (req: Request<{}, {}, AuthRequestBodyType, {}>, res: Response) => {
    const {login, password} = req.body

    const authResult = await authService.authUser({login, password});

    if (authResult) {
        res.sendStatus(204)
    } else {
        res.sendStatus(401)
    }
})
