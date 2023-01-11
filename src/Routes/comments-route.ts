import {Router} from "express";
import {authMiddleWare, contentCommentValidator, errorMiddleWAre} from "../middleWares/middleWares";
import {commentController} from "../compositionRoots/compositions-root";

export const commentsRoute = Router({});

commentsRoute.get('/:commentId', commentController.getCurrentComment.bind(commentController))

commentsRoute.put('/:commentId', authMiddleWare,
    contentCommentValidator, errorMiddleWAre, commentController.updateComment.bind(commentController))

commentsRoute.delete('/:commentId', authMiddleWare, commentController.deleteComment.bind(commentController))