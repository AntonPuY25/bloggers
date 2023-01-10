import {Request, Response, Router} from "express";
import {TestingService} from "../domains/testing-service";

export const testingRoute = Router({});

class ClearData {
    testingService: TestingService;

    constructor() {
        this.testingService = new TestingService();
    }

    async allClear(req: Request, res: Response) {
        const {success} = await this.testingService.allClear()

        if (success) {
            res.sendStatus(204)
        }

    }
}

const instanceClearData = new ClearData();

testingRoute.delete('/all-data', instanceClearData.allClear)