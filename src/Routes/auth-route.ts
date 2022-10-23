import {Request, Response, Router} from "express";
import {AuthRequestBodyType} from "../interfaces/interfaces";
import {authService} from "../domains/auth-service";
import {jwtService} from "../domains/jwy-servive";
import {
    authMiddleWare, emailDuplicationValidator,
    emailValidator,
    errorMiddleWAre, loginDuplicationValidator,
    loginValidator,
    passwordValidator
} from "../middleWares/middleWares";
import {
    RegistrationBodyTypes,
    RegistrationConfirmationBodyTypes,
    RegistrationResendingEmailBodyTypes
} from "../interfaces/registration-types/interface";

export const authRoute = Router({});


authRoute.post('/registration', loginValidator, passwordValidator, emailValidator, emailDuplicationValidator, loginDuplicationValidator, errorMiddleWAre, async (req: Request<{}, {}, RegistrationBodyTypes, {}>, res: Response) => {

    const {login, password, email} = req.body;

    const currentUser = await authService.registerUser({email, login, password})

    if (!currentUser) return res.sendStatus(404);

    res.sendStatus(204)
})

authRoute.post('/registration-confirmation', async (req: Request<{}, {}, RegistrationConfirmationBodyTypes, {}>, res: Response) => {
    const {code} = req.body;

    const result = await authService.confirmEmail({code})

    if (result?.isError) {
        return result?.message ? res.status(404).send(result.message) : res.sendStatus(404)

    } else {
        return res.sendStatus(204)
    }
})


authRoute.post('/registration-email-resending', emailValidator, errorMiddleWAre, async (req: Request<{}, {}, RegistrationResendingEmailBodyTypes, {}>, res: Response) => {
    const {email} = req.body;

    const result = await authService.resendEmail({email})

    if (result?.isError) {
        return result?.message ? res.status(404).send(result.message) : res.sendStatus(404)
    } else {
        return res.sendStatus(204)
    }
})

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
