import {Request, Response, Router} from "express";
import {testingService} from "../domains/testing-service";

export const testingRoute = Router({});

testingRoute.delete('/all-data', async (req: Request, res: Response) => {
    const {success} = await testingService.allClear()

    if(success){
        res.sendStatus(204)
    }

})