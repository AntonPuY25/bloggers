import {Router} from "express";
import {
    authMiddleWare,
    authorizationMiddleWare,
    bloggerIdValidator,
    contentCommentValidator,
    contentValidator,
    descriptionValidator,
    errorMiddleWAre,
    titleValidator
} from "../middleWares/middleWares";
import {PostController} from "../controllers/post-controller";
import {postController} from "../compositionRoots/compositions-root";

export const postsRoute = Router({});

postsRoute.get('/', postController.getPosts.bind(postController))

postsRoute.post('/', authorizationMiddleWare, titleValidator,
    descriptionValidator, contentValidator, bloggerIdValidator,
    errorMiddleWAre, postController.createPost.bind(postController))

postsRoute.get('/:id', postController.getCurrentPost.bind(postController))

postsRoute.put('/:id', authorizationMiddleWare,
    titleValidator, descriptionValidator, contentValidator,

    bloggerIdValidator, errorMiddleWAre, postController.updatePost.bind(postController))

postsRoute.delete('/:id', authorizationMiddleWare,
    postController.deletedPost.bind(postController))

postsRoute.post('/:postId/comments', authMiddleWare,
    contentCommentValidator, errorMiddleWAre,
    postController.createCommentForCurrentPost.bind(postController))

postsRoute.get('/:postId/comments',
    postController.getCommentForCurrentPost.bind(postController))