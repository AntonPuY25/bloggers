import {CommentsRepository} from "../Repositories/comments-repository";
import {Request, Response} from "express";
import {UpdateCommentBodyParamsType} from "../interfaces/interfaces";

export class CommentController {
    constructor(protected commentsRepository: CommentsRepository) {}

    async getCurrentComment(req: Request<{ commentId: string },
        {}, {}, {}>, res: Response) {
        const {commentId} = req.params;

        const currentComment = await this.commentsRepository.getCurrentComment(commentId);
        if (currentComment) {
            res.status(200).send(currentComment)
        } else {
            res.sendStatus(404)
        }

    }

    async updateComment(req: Request<{ commentId: string },
        {}, UpdateCommentBodyParamsType, {}>, res: Response) {
        const {content} = req.body;
        const {commentId} = req.params;
        const {id} = req.user!;

        const currentComment = await this.commentsRepository.getCurrentComment(commentId);

        if (!currentComment) return res.sendStatus(404)

        if (currentComment.userId !== id) return res.sendStatus(403)

        const result = await this.commentsRepository.updateCurrentComment(commentId, content);

        if (result) {
            res.sendStatus(204)
        } else {
            res.sendStatus(404)
        }

    }

    async deleteComment(req: Request<{ commentId: string }, {}, {}, {}>, res: Response) {
        const {commentId} = req.params;
        const {id} = req.user!;

        const currentComment = await this.commentsRepository.getCurrentComment(commentId);
        if (!currentComment) return res.sendStatus(404)

        if (currentComment.userId !== id) return res.sendStatus(403)

        const result = await this.commentsRepository.deleteCurrentComment(commentId);
        if (result) {
            res.sendStatus(204)
        } else {
            res.sendStatus(404)
        }

    }
}
