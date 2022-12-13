import {Request, Response, Router} from "express";
import {testingService} from "../domains/testing-service";

export const testingRoute = Router({});

class ClearData {
    async allClear(req: Request, res: Response) {
        const {success} = await testingService.allClear()

        if (success) {
            res.sendStatus(204)
        }

    }
}

const instanceClearData = new ClearData();

testingRoute.delete('/all-data', instanceClearData.allClear)