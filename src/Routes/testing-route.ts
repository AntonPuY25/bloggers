import {Request, Response, Router} from "express";
import {testingRepository} from "../Repositories/testing-repository";

export const testingRoute = Router({});

testingRoute.delete('/all-data', (req: Request, res: Response) => {
    const {success} = testingRepository.allClear()

    if(success){
        res.sendStatus(204)
    }

})