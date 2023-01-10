import {Router, Request, Response} from "express";
import {TokensRepository} from "../Repositories/tokens-repository";
import {JwtService} from "../domains/jwy-servive";

export const securityRoute = Router({});

class SecurityController {
    tokensRepository: TokensRepository;
    jwtService: JwtService;

    constructor() {
        this.tokensRepository = new TokensRepository();
        this.jwtService = new JwtService()
    }

    async getDevices(req: Request, res: Response) {
        const {refreshToken} = req.cookies;
        if (!refreshToken) return res.sendStatus(401);

        const currentUserId = await this.jwtService.getUserIdByToken(refreshToken);
        if (!currentUserId) return res.sendStatus(401);
        const result = await this.tokensRepository.getAllTokens(currentUserId);
        if (result) {
            return res.status(200).send(result)
        } else {
            return res.sendStatus(401)
        }
    }

    async deleteDevices(req: Request, res: Response) {
        const {refreshToken} = req.cookies;
        if (!refreshToken) return res.sendStatus(401);
        const tokenData = await this.jwtService.getCurrentIssueAt(refreshToken);
        if (!tokenData) return res.sendStatus(401);

        const result = await this.tokensRepository.deleteAllExceptCurrent(tokenData.issueAt);
        if (!result) return res.sendStatus(401);

        res.sendStatus(204)
    }

    async deleteCurrentDevice(req: Request, res: Response) {
        const {refreshToken} = req.cookies;
        const {deviceId} = req.params;
        if (!refreshToken) return res.sendStatus(401);
        const userData = await this.jwtService.getCurrentDeviceId(refreshToken);

        if (!userData) return res.sendStatus(401);

        const currentSession = await this.tokensRepository.getCurrentSessionByDeviceId(deviceId);

        if (!currentSession) return res.sendStatus(404);

        if (userData.userId === currentSession.userId) {
            await this.tokensRepository.deleteCurrentToken(deviceId);
        } else {
            return res.sendStatus(403)
        }

        res.sendStatus(204)
    }
}

const instanceSecurityController = new SecurityController();

securityRoute.get('/devices', instanceSecurityController.getDevices.bind(instanceSecurityController))

securityRoute.delete('/devices', instanceSecurityController.deleteDevices.bind(instanceSecurityController))

securityRoute.delete('/devices/:deviceId', instanceSecurityController.deleteCurrentDevice.bind(instanceSecurityController))
