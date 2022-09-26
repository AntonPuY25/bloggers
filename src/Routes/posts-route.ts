import {Request, Response, Router} from "express";
import {
    authorizationMiddleWare,
    bloggerIdValidator,
    contentValidator,
    descriptionValidator,
    errorMiddleWAre,
    titleValidator
} from "../middleWares/middleWares";
import {getCurrentFieldError} from "../helpers/helpers";
import {postsService} from "../services/posts-service";
import {queryPostsRepository} from "../Repositories/queryReposotories/query-posts-repository";

export const postsRoute = Router({});

postsRoute.get('/', async (req: Request, res: Response) => {

    const {pageNumber, pageSize, sortBy, sortDirection} = req.query;
    res.send(await queryPostsRepository.getPosts({
        pageSize: pageSize ? Number(pageSize) : 10,
        pageNumber: pageNumber ? Number(pageNumber) : 1,
        sortBy: sortBy as string,
        sortDirection: sortDirection as string,
    }))
})

postsRoute.post('/', authorizationMiddleWare, titleValidator, descriptionValidator, contentValidator, bloggerIdValidator, errorMiddleWAre, async (req: Request, res: Response) => {
    const currentPost = await postsService.createPost(req.body)

    if (currentPost) {
        res.status(201).send(currentPost)
    } else {
        res.status(400).send(getCurrentFieldError('blogId', 'This blogger not found'))
    }

})

postsRoute.get('/:id', async (req: Request, res: Response) => {
    const postId = req.params.id;

    const currentPost = await queryPostsRepository.getCurrentPost(postId)
    if (currentPost) {
        res.send(currentPost)
    } else {
        res.send(404)
    }
})

postsRoute.put('/:id', authorizationMiddleWare, titleValidator, descriptionValidator, contentValidator, bloggerIdValidator, errorMiddleWAre, async (req: Request, res: Response) => {
    const postId = req.params.id;
    console.log(req.body, 'req.body')

    const currentPost = await postsService.updatePost({...req.body, postId})
    if (currentPost) {
        res.send(204)
    } else {
        res.send(404)
    }

})

postsRoute.delete('/:id', authorizationMiddleWare, async (req: Request, res: Response) => {
    const postId = req.params.id;

    const currentPost = await postsService.deletedPost(postId)
    if (currentPost) {
        res.send(204)
    } else {
        res.send(404)
    }
})