import {Request, Response, Router} from "express";
import {postsRepositories} from "../Repositories/posts-repository";
import {
    authorizationMiddleWare,
    bloggerIdValidator,
    contentValidator,
    descriptionValidator,
    errorMiddleWAre,
    titleValidator
} from "../middleWares/middleWares";
import {getCurrentFieldError} from "../helpers/helpers";

export const postsRoute = Router({});

postsRoute.get('/', (req: Request, res: Response) => {
    res.send(postsRepositories.getPosts())
})

postsRoute.post('/',authorizationMiddleWare, titleValidator, descriptionValidator, contentValidator, bloggerIdValidator, errorMiddleWAre, (req: Request, res: Response) => {
    const currentPost = postsRepositories.createPost(req.body)

    if (currentPost) {
        res.status(201).send(currentPost)
    } else {
        res.status(400).send(getCurrentFieldError('bloggerId', 'This blogger not found'))
    }

})

postsRoute.get('/:id', (req: Request, res: Response) => {
    const postId = Number(req.params.id);

    const currentPost = postsRepositories.getCurrentPost(postId)
    if (currentPost) {
        res.send(currentPost)
    } else {
        res.send(404)
    }
})

postsRoute.put('/:id',authorizationMiddleWare, titleValidator, descriptionValidator, contentValidator, bloggerIdValidator, errorMiddleWAre, (req: Request, res: Response) => {
    const postId = Number(req.params.id);

    const currentPost = postsRepositories.updatePost({...req.body, postId})
    if (currentPost === -1) {
        res.status(400).send(getCurrentFieldError('bloggerId', 'Not found this blogger'))
    }
    if (currentPost) {
        res.send(204)
    } else {
        res.send(404)
    }

})

postsRoute.delete('/:id', authorizationMiddleWare,(req: Request, res: Response) => {
    const postId = Number(req.params.id);

    const currentPost = postsRepositories.deletedPost(postId)
    if (currentPost) {
        res.send(204)
    } else {
        res.send(404)
    }
})