import {Request, Response, Router} from "express";
import {AuthRequestBodyType} from "../interfaces/interfaces";
import {authService} from "../domains/auth-service";
import {jwtService} from "../domains/jwy-servive";
import {authMiddleWare} from "../middleWares/middleWares";

export const authRoute = Router({});

authRoute.post('/login', async (req: Request<{}, {}, AuthRequestBodyType, {}>, res: Response) => {
    const {login, password} = req.body;

    const authResult = await authService.authUser({login, password});

    if (authResult) {
        const token = await jwtService.createJwt(authResult)
        res.status(200).send(token.data)
    } else {
        res.sendStatus(401)
    }
})

authRoute.get('/me', authMiddleWare, async (req: Request, res: Response) => {
    const {login, id, email} = req.user!;

    res.status(200).send({
        email,
        login,
        userId: id,
    })
})
