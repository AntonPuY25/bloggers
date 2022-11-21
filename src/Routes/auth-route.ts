import {Request, Response, Router} from "express";
import {AuthRequestBodyType} from "../interfaces/interfaces";
import {authService} from "../domains/auth-service";
import {jwtService} from "../domains/jwy-servive";
import {
    authMiddleWare, codeValidator,
    emailValidator,
    errorMiddleWAre,
    loginValidator,
    passwordValidator
} from "../middleWares/middleWares";
import {
    GetRefreshJWTTokenType, JWTTokenMethodType,
    JWTTokenType,
    RegistrationBodyTypes,
    RegistrationConfirmationBodyTypes,
    RegistrationResendingEmailBodyTypes
} from "../interfaces/registration-types/interface";
import {duplicatedEmail, duplicatedLogin} from "../helpers/helpers";
import {v4 as uuidv4} from "uuid";
import {ACCESS_TOKEN_TIME, REFRESH_TOKEN_TIME} from "../interfaces/registration-types/constants";
import {tokensRepository} from "../Repositories/tokens-repository";

export const authRoute = Router({});


authRoute.post('/registration', loginValidator, passwordValidator, emailValidator, errorMiddleWAre, async (req: Request<{}, {}, RegistrationBodyTypes, {}>, res: Response) => {

    const {login, password, email} = req.body;

    const isDuplicatedEmail = await duplicatedEmail(email)
    const isDuplicatedLogin = await duplicatedLogin(login)

    if (isDuplicatedEmail) return res.status(400).send(isDuplicatedEmail)
    if (isDuplicatedLogin) return res.status(400).send(isDuplicatedLogin)

    const currentUser = await authService.registerUser({email, login, password})

    if (!currentUser) return res.sendStatus(404);

    res.sendStatus(204)
})

authRoute.post('/registration-confirmation', codeValidator, errorMiddleWAre, async (req: Request<{}, {}, RegistrationConfirmationBodyTypes, {}>, res: Response) => {
    const {code} = req.body;
    const result = await authService.confirmEmail({code})

    if (result?.isError) {
        return result?.message ? res.status(400).send(result.message) : res.sendStatus(400)
    } else {
        return res.sendStatus(204)
    }
})


authRoute.post('/registration-email-resending', emailValidator, errorMiddleWAre, async (req: Request<{}, {}, RegistrationResendingEmailBodyTypes, {}>, res: Response) => {
    const {email} = req.body;
    const result = await authService.resendEmail({email})

    if (result?.isError) {
        return result?.message ? res.status(400).send(result.message) : res.sendStatus(404)
    } else {
        return res.sendStatus(204)
    }
})

authRoute.post('/login', async (req: Request<{}, {}, AuthRequestBodyType, {}>, res: Response) => {
    const {loginOrEmail, password} = req.body;

    console.log(req.body,'req.bodyreq.bodyreq.body')
    const device = req.headers['user-agent'];
    const ip = req.ip;

    console.log('LOGIN')
    const deviceId = uuidv4();
    const authResult = await authService.authUser({loginOrEmail, password});

    if (authResult) {
        const accessToken = await jwtService.createJwt({
            user: authResult,
            expiresIn: ACCESS_TOKEN_TIME,
            type: JWTTokenType.accessToken,
            deviceId,
            device,
            methodType: JWTTokenMethodType.create,
            ip,
        })
        const refreshToken = await jwtService.createJwt({
            user: authResult,
            expiresIn: REFRESH_TOKEN_TIME,
            type: JWTTokenType.refreshToken,
            deviceId,
            device,
            methodType: JWTTokenMethodType.create,
            ip
        })
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
        })
        return res.status(200).send({accessToken})
    } else {
        return res.sendStatus(401)
    }
})

authRoute.post('/logout', async (req: Request, res: Response) => {
    const {refreshToken} = req.cookies;
    if (!refreshToken) return res.sendStatus(401)

    const currentDeviceId = await jwtService.getCurrentDeviceId(refreshToken);
    await tokensRepository.deleteCurrentToken(currentDeviceId);

    const userId = await jwtService.getUserIdByToken(refreshToken)


    if (userId) {
        const result = await jwtService.logout(refreshToken);
        if (result) {
            return res.sendStatus(204)
        }
    }
    return res.sendStatus(401)


})

authRoute.get('/me', authMiddleWare, async (req: Request, res: Response) => {
    const {id} = req.user!;
    const {email, login} = req.user?.userData!

    res.status(200).send({
        email,
        login,
        userId: id,
    })
})

authRoute.post('/refresh-token', async (req: Request, res: Response) => {
    const {refreshToken} = req.cookies;
    const device = req.headers['user-agent'];
    if (!refreshToken) return res.sendStatus(401)
    const ip = req.ip;

    const result: GetRefreshJWTTokenType | null = await jwtService.refreshToken(refreshToken, device,ip)

    if (result) {
        return res.cookie('refreshToken', result.refreshToken, {
            httpOnly: true,
        }).status(200).send({'accessToken': result.accessToken})
    } else {
        return res.sendStatus(401)
    }

})
