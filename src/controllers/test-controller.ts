import {TestingService} from "../domains/testing-service";
import {Request, Response} from "express";

export class ClearDataController {

    constructor(protected testingService: TestingService) {}

    async allClear(req: Request, res: Response) {
        const {success} = await this.testingService.allClear()

        if (success) {
            res.sendStatus(204)
        }

    }
}