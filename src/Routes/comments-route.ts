import {Request, Response, Router} from "express";
import {UpdateCommentBodyParamsType} from "../interfaces/interfaces";
import {authMiddleWare, contentCommentValidator, errorMiddleWAre} from "../middleWares/middleWares";
import {commentsRepository} from "../Repositories/comments-repository";

export const commentsRoute = Router({});

commentsRoute.get('/:commentId', async (req: Request<{ commentId: string }, {}, {}, {}>, res: Response) => {
    const {commentId} = req.params;

    const currentComment = await commentsRepository.getCurrentComment(commentId);
    if (currentComment) {
        res.status(200).send(currentComment)
    } else {
        res.sendStatus(404)
    }

})

commentsRoute.put('/:commentId', authMiddleWare, contentCommentValidator, errorMiddleWAre, async (req: Request<{ commentId: string }, {}, UpdateCommentBodyParamsType, {}>, res: Response) => {
    const {content} = req.body;
    const {commentId} = req.params;


    const currentComment = await commentsRepository.getCurrentComment(commentId);
    if (currentComment) {
        const result = await commentsRepository.updateCurrentComment(commentId, content);
        if (result) {
            res.sendStatus(204)
        } else {
            res.sendStatus(404)
        }

    } else {
        res.sendStatus(404)
    }
})

commentsRoute.delete('/:commentId', authMiddleWare, async (req: Request<{ commentId: string }, {}, {}, {}>, res: Response) => {
    const {commentId} = req.params;

    const currentComment = await commentsRepository.getCurrentComment(commentId);
    if (currentComment) {
        const result = await commentsRepository.deleteCurrentComment(commentId);
        if (result) {
            res.sendStatus(204)
        } else {
            res.sendStatus(404)
        }

    } else {
        res.sendStatus(404)
    }
})