import {Request, Response, Router} from "express";
import {AuthNewPasswordBodyType, AuthRecoveryPasswordBodyType, AuthRequestBodyType} from "../interfaces/interfaces";
import {
    authMiddleWare, checkRequestLimitsMiddleWare, codeValidator,
    emailValidator,
    errorMiddleWAre,
    loginValidator, newPasswordValidator,
    passwordValidator
} from "../middleWares/middleWares";
import {
    GetRefreshJWTTokenType, JWTTokenMethodType,
    JWTTokenType,
    RegistrationBodyTypes,
    RegistrationConfirmationBodyTypes,
    RegistrationResendingEmailBodyTypes
} from "../interfaces/registration-types/interface";
import {duplicatedEmail, duplicatedLogin, getGeneratedHashPassword} from "../helpers/helpers";
import {v4 as uuidv4} from "uuid";
import {ACCESS_TOKEN_TIME, REFRESH_TOKEN_TIME} from "../interfaces/registration-types/constants";
import bcrypt from "bcrypt";
import {AuthService} from "../domains/auth-service";
import {UsersRepository} from "../Repositories/users-repository";
import {TokensRepository} from "../Repositories/tokens-repository";
import {JwtService} from "../domains/jwy-servive";
import {RequestLimitsService} from "../domains/request-limits-service";

export const authRoute = Router({});

class AuthController {
    authService: AuthService;
    usersRepository: UsersRepository;
    tokensRepository: TokensRepository;
    jwtService: JwtService;
    requestLimitsService: RequestLimitsService;

    constructor() {
        this.authService = new AuthService();
        this.usersRepository = new UsersRepository();
        this.tokensRepository = new TokensRepository();
        this.jwtService = new JwtService();
        this.requestLimitsService = new RequestLimitsService();
    }

    async registration(req: Request<{}, {}, RegistrationBodyTypes, {}>, res: Response) {

        const {login, password, email} = req.body;

        const isDuplicatedEmail = await duplicatedEmail(email)
        const isDuplicatedLogin = await duplicatedLogin(login)

        if (isDuplicatedEmail) return res.status(400).send(isDuplicatedEmail)
        if (isDuplicatedLogin) return res.status(400).send(isDuplicatedLogin)

        const currentUser = await this.authService.registerUser({email, login, password})

        if (!currentUser) return res.sendStatus(404);

        res.sendStatus(204)
    }

    async confirmRegistration(req: Request<{}, {}, RegistrationConfirmationBodyTypes, {}>, res: Response) {
        const {code} = req.body;
        const result = await this.authService.confirmEmail({code})

        if (result?.isError) {
            return result?.message ? res.status(400).send(result.message) : res.sendStatus(400)
        } else {
            return res.sendStatus(204)
        }
    }

    async emailResendingForRegistration(req: Request<{}, {}, RegistrationResendingEmailBodyTypes, {}>, res: Response) {
        const {email} = req.body;
        const result = await this.authService.resendEmail({email})

        if (result?.isError) {
            return result?.message ?
                res.status(400).send(result.message)
                : res.sendStatus(404)
        } else {
            return res.sendStatus(204)
        }
    }

    async login(req: Request<{}, {}, AuthRequestBodyType, {}>, res: Response) {
        const {loginOrEmail, password} = req.body;

        const device = req.headers['user-agent'];
        const ip = req.ip;
        const deviceId = uuidv4();

        const authResult = await this.authService.authUser({loginOrEmail, password});

        if (authResult) {
            const accessToken = await this.jwtService.createJwt({
                user: authResult,
                expiresIn: ACCESS_TOKEN_TIME,
                type: JWTTokenType.accessToken,
                deviceId,
                device,
                methodType: JWTTokenMethodType.create,
                ip,
            })

            const refreshToken = await this.jwtService.createJwt({
                user: authResult,
                expiresIn: REFRESH_TOKEN_TIME,
                type: JWTTokenType.refreshToken,
                deviceId,
                device,
                methodType: JWTTokenMethodType.create,
                ip,
            })

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: true,
            })

            return res.status(200).send({accessToken})
        } else {
            return res.sendStatus(401)
        }
    }

    async logout(req: Request, res: Response) {
        const {refreshToken} = req.cookies;
        if (!refreshToken) return res.sendStatus(401)

        const ip = req.ip;


        await this.requestLimitsService.deleteLimitsByIp(ip)

        const currentSession = await this.jwtService.getCurrentDeviceId(refreshToken);

        if (!currentSession) return res.sendStatus(401);

        const userId = await this.jwtService.getUserIdByToken(refreshToken)


        if (userId) {
            const result = await this.jwtService.logout(userId);
            if (result) {
                await this.tokensRepository.deleteCurrentToken(currentSession.deviceId);
                res.clearCookie('refreshToken');
                return res.sendStatus(204)
            }
        }
        return res.sendStatus(401)


    }

    async getMyData(req: Request, res: Response) {
        const {id} = req.user!;
        const {email, login} = req.user?.userData!

        res.status(200).send({
            email,
            login,
            userId: id,
        })
    }

    async refreshToken(req: Request, res: Response) {
        const {refreshToken} = req.cookies;

        if (!refreshToken) return res.sendStatus(401);

        const ip = req.ip;

        const result: GetRefreshJWTTokenType | null = await this.jwtService.refreshToken(refreshToken, ip);

        if (result) {
            return res.cookie('refreshToken', result.refreshToken, {
                httpOnly: true,
                secure: true,
            }).status(200).send({'accessToken': result.accessToken})
        } else {
            return res.sendStatus(401)
        }

    }

    async passwordRecovery(req: Request<{}, {}, AuthRecoveryPasswordBodyType, {}>, res: Response) {
        const {email} = req.body;

        const currentUser = await this.usersRepository.getCurrentUserByEmail({email});

        if (!currentUser) return res.sendStatus(204);

        const result = await this.authService.recoveryPassword({email, code: currentUser?.userData?.password});

        if (result?.message === 'Success') {
            return res.sendStatus(204);
        }

        res.sendStatus(404)


    }

    async createNewPassword(req: Request<{}, {}, AuthNewPasswordBodyType, {}>, res: Response) {
        const {recoveryCode, newPassword} = req.body;

        const currentUser = await this.usersRepository.getCurrentUserByPassword({password: recoveryCode})

        if (!currentUser) {
            return res.status(400).send({errorsMessages: [{message: 'recoveryCode incorrect', field: 'recoveryCode'}]})
        }

        const passwordSalt = await bcrypt.genSalt(10)
        const passwordHash = await getGeneratedHashPassword(newPassword, passwordSalt)

        const result = await this.usersRepository.updatedCurrentUserPassword({
            passwordHash,
            passwordSalt,
            id: currentUser.id
        })

        if (result) {
            res.sendStatus(204)
        } else {
            res.sendStatus(400)
        }
    }
}

const instanceAuthController = new AuthController();

authRoute.post('/registration', checkRequestLimitsMiddleWare, loginValidator,
    passwordValidator, emailValidator, errorMiddleWAre,
    instanceAuthController.registration)

authRoute.post('/registration-confirmation', checkRequestLimitsMiddleWare, codeValidator,
    errorMiddleWAre, instanceAuthController.confirmRegistration)


authRoute.post('/registration-email-resending', checkRequestLimitsMiddleWare,
    emailValidator, errorMiddleWAre, instanceAuthController.emailResendingForRegistration)

authRoute.post('/login', checkRequestLimitsMiddleWare, instanceAuthController.login)

authRoute.post('/logout', instanceAuthController.logout)

authRoute.get('/me', authMiddleWare, instanceAuthController.getMyData)

authRoute.post('/refresh-token', instanceAuthController.refreshToken)

authRoute.post('/password-recovery', checkRequestLimitsMiddleWare, emailValidator,
    errorMiddleWAre, instanceAuthController.passwordRecovery)

authRoute.post('/new-password', checkRequestLimitsMiddleWare, newPasswordValidator, errorMiddleWAre,
    instanceAuthController.createNewPassword)
