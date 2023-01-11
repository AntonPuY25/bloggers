import {Router} from "express";
import {
    authMiddleWare,
    checkRequestLimitsMiddleWare,
    codeValidator,
    emailValidator,
    errorMiddleWAre,
    loginValidator,
    newPasswordValidator,
    passwordValidator
} from "../middleWares/middleWares";
import {authController} from "../compositionRoots/compositions-root";

export const authRoute = Router({});


authRoute.post('/registration', checkRequestLimitsMiddleWare, loginValidator,
    passwordValidator, emailValidator, errorMiddleWAre,
    authController.registration.bind(authController))

authRoute.post('/registration-confirmation', checkRequestLimitsMiddleWare, codeValidator,
    errorMiddleWAre, authController.confirmRegistration.bind(authController))


authRoute.post('/registration-email-resending', checkRequestLimitsMiddleWare,
    emailValidator, errorMiddleWAre, authController.emailResendingForRegistration.bind(authController))

authRoute.post('/login', checkRequestLimitsMiddleWare, authController.login.bind(authController))

authRoute.post('/logout', authController.logout.bind(authController))

authRoute.get('/me', authMiddleWare, authController.getMyData.bind(authController))

authRoute.post('/refresh-token', authController.refreshToken.bind(authController))

authRoute.post('/password-recovery', checkRequestLimitsMiddleWare, emailValidator,
    errorMiddleWAre, authController.passwordRecovery.bind(authController))

authRoute.post('/new-password', checkRequestLimitsMiddleWare, newPasswordValidator, errorMiddleWAre,
    authController.createNewPassword.bind(authController))
