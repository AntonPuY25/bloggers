import {Router} from "express";
import {authMiddleWare} from "../middleWares/middleWares";
import {tokensRepository} from "../Repositories/tokens-repository";

export const securityRoute = Router({});

securityRoute.get('/',authMiddleWare,async (req,res)=>{
    const result = await  tokensRepository.getAllTokens();
    if(result){
        return res.status(200).send(result)
    }else {
        return res.sendStatus(401)
    }
})