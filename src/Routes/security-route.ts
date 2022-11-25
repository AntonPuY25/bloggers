import {Router, Request, Response} from "express";
import {tokensRepository} from "../Repositories/tokens-repository";
import {jwtService} from "../domains/jwy-servive";

export const securityRoute = Router({});

securityRoute.get('/devices', async (req, res) => {
    const result = await tokensRepository.getAllTokens();
    const {refreshToken} = req.cookies;
    if(!refreshToken)  return res.sendStatus(401);
    if (result) {
        return res.status(200).send(result)
    } else {
        return res.sendStatus(401)
    }
})

securityRoute.delete('/devices', async (req, res) => {
    const {refreshToken} = req.cookies;
    if(!refreshToken)  return res.sendStatus(401);
    const issueAt = await jwtService.getCurrentIssueAt(refreshToken);
    if (!issueAt) return res.sendStatus(401);

    const result = await tokensRepository.deleteAllExceptCurrent(issueAt);
    if (!result) return res.sendStatus(401);

    res.sendStatus(204)
})
securityRoute.delete('/devices/:deviceId', async (req: Request, res: Response) => {
    const {refreshToken} = req.cookies;
    const {deviceId} = req.params;
    if(!refreshToken)  return res.sendStatus(401);
    const userData = await jwtService.getCurrentDeviceId(refreshToken);
    if (!userData) return res.sendStatus(401);

    const currentSession = await tokensRepository.getCurrentSessionByDeviceId(deviceId)

    if(!currentSession) return res.sendStatus(404)

    if(userData.userId === currentSession.userId){
        res.clearCookie('refreshToken')
    }else{
       return  res.sendStatus(403)
    }

    const result = await tokensRepository.deleteCurrentToken(deviceId);
    if (!result) return res.sendStatus(401);

    res.sendStatus(204)
})
