import {Router} from "express";
import {securityController} from "../compositionRoots/compositions-root";

export const securityRoute = Router({});

securityRoute.get('/devices', securityController.getDevices.bind(securityController))

securityRoute.delete('/devices', securityController.deleteDevices.bind(securityController))

securityRoute.delete('/devices/:deviceId', securityController.deleteCurrentDevice.bind(securityController))
