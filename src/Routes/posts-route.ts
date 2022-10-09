import {Request, Response, Router} from "express";
import {
    authMiddleWare,
    authorizationMiddleWare,
    bloggerIdValidator, contentCommentValidator,
    contentValidator,
    descriptionValidator,
    errorMiddleWAre,
    titleValidator
} from "../middleWares/middleWares";
import {getCurrentFieldError} from "../helpers/helpers";
import {postsService} from "../services/posts-service";
import {queryPostsRepository} from "../Repositories/queryReposotories/query-posts-repository";
import {GetCommentsQueryType, sortDirectionType, UpdateCommentBodyParamsType} from "../interfaces/interfaces";
import {postsRepositories} from "../Repositories/posts-repository";
import {commentsRepository} from "../Repositories/comments-repository";

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

postsRoute.post('/:postId/comments', authMiddleWare, contentCommentValidator, errorMiddleWAre, async (req: Request<{ postId: string }, {}, UpdateCommentBodyParamsType, {}>, res: Response) => {
    const {postId} = req.params;
    const {content} = req.body;
    const {id, login} = req.user!;


    const currentPost = await postsRepositories.getCurrentPost(postId)

    if (currentPost) {
        const currentComment = await commentsRepository.createComment({
            postId,
            content,
            userId: id,
            userLogin: login
        })
        if (currentComment) {
            res.status(201).send(currentComment)
        } else {
            res.sendStatus(404)
        }

    } else {
        res.sendStatus(404)
    }


})

postsRoute.get('/:postId/comments', authMiddleWare,
    async (req: Request<{ postId: string }, {}, {}, {
        pageNumber: string,
        pageSize: string,
        sortBy: string,
        sortDirection: sortDirectionType,

    }>, res: Response) => {
        const {postId} = req.params;
        const {pageNumber, pageSize, sortBy, sortDirection} = req.query;


        const currentPost = await postsRepositories.getCurrentPost(postId)

        if (currentPost) {
            const comments = await commentsRepository.getCommentsForCurrentPost({
                pageSize: pageSize ? Number(pageSize) : 10,
                pageNumber: pageNumber ? Number(pageNumber) : 1,
                sortBy: sortBy as string,
                sortDirection: sortDirection as sortDirectionType,
                postId
            })

            if (comments) {
                res.status(200).send(comments)
            } else {
                res.sendStatus(404)
            }

        } else {
            res.sendStatus(404)
        }


    })