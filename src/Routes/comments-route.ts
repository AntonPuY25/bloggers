import {Request, Response, Router} from "express";
import {UpdateCommentBodyParamsType} from "../interfaces/interfaces";
import {authMiddleWare, contentCommentValidator, errorMiddleWAre} from "../middleWares/middleWares";

export const commentsRoute = Router({});

commentsRoute.get('/:commentId', async (req: Request<{commentId:string },{},{},{}>, res: Response) => {
    const {commentId} = req.params;

    if (commentId) {
        res.status(200).send({
            id:commentId,
            content: 'Content',
            userId: 'UserId',
            userLogin: 'UserLogin',
            createdAt: 'createdAt'
        })
    } else {
        res.sendStatus(404)
    }
})

commentsRoute.put('/:commentId', authMiddleWare, contentCommentValidator, errorMiddleWAre, async (req: Request<{commentId:string }, {}, UpdateCommentBodyParamsType, {}>, res: Response) => {
    const {content} = req.body;
    const {commentId} = req.params;

    console.log(commentId,'commentId')

    if (content) {
        res.sendStatus(204)
    } else {
        res.sendStatus(404)
    }
})

commentsRoute.delete('/:commentId', authMiddleWare, async (req: Request<{commentId:string}, {}, {}, {}>, res: Response) => {
    const {commentId} = req.params;


    if (commentId) {
        res.sendStatus(204)
    } else {
        res.sendStatus(404)
    }
})