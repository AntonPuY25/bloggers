import {Request, Response, Router} from "express";
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
import {getCurrentFieldError, getPostsData} from "../helpers/helpers";
import {postsService} from "../services/posts-service";
import {queryPostsRepository} from "../Repositories/queryReposotories/query-posts-repository";
import {sortDirectionType, UpdateCommentBodyParamsType} from "../interfaces/interfaces";
import {postsRepositories} from "../Repositories/posts-repository";
import {commentsRepository} from "../Repositories/comments-repository";
import {GetPostsData} from "../helpers/types";

export const postsRoute = Router({});

postsRoute.get('/', async (req: Request, res: Response) => {

    const {pageNumber, pageSize, sortBy, sortDirection} = req.query;
    res.send(await queryPostsRepository.getPosts(getPostsData({
        pageSize,
        pageNumber,
        sortBy,
        sortDirection
    } as GetPostsData)))
})

postsRoute.post('/', authorizationMiddleWare, titleValidator,
    descriptionValidator, contentValidator, bloggerIdValidator,
    errorMiddleWAre, async (req: Request, res: Response) => {
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

postsRoute.put('/:id', authorizationMiddleWare,
    titleValidator, descriptionValidator, contentValidator,

    bloggerIdValidator, errorMiddleWAre, async (req: Request, res: Response) => {
        const postId = req.params.id;

        const currentPost = await postsService.updatePost(
            {...req.body, postId})

        if (currentPost) {
            res.send(204)
        } else {
            res.send(404)
        }
    })

postsRoute.delete('/:id', authorizationMiddleWare,
    async (req: Request, res: Response) => {
        const postId = req.params.id;

        const currentPost = await postsService.deletedPost(postId)
        if (currentPost) {
            res.send(204)
        } else {
            res.send(404)
        }
    })

postsRoute.post('/:postId/comments', authMiddleWare,
    contentCommentValidator, errorMiddleWAre,
    async (req: Request<{ postId: string }, {}, UpdateCommentBodyParamsType, {}>,
           res: Response) => {

        const {postId} = req.params;
        const {content} = req.body;
        const {id, login} = req.user!;

        const currentPost = await postsRepositories.getCurrentPost(postId)

        if (!currentPost) return res.sendStatus(404)

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

    })

postsRoute.get('/:postId/comments',
    async (req: Request<{ postId: string }, {}, {}, {
        pageNumber: string,
        pageSize: string,
        sortBy: string,
        sortDirection: sortDirectionType,

    }>, res: Response) => {
        const {postId} = req.params;
        const {pageNumber, pageSize, sortBy, sortDirection} = req.query;


        const currentPost = await postsRepositories.getCurrentPost(postId)
        if (!currentPost) return res.sendStatus(404)

        const postData = getPostsData({
            pageNumber,
            pageSize,
            sortBy,
            sortDirection
        } as GetPostsData);


        const comments = await commentsRepository.getCommentsForCurrentPost(
            {postId, ...postData})

        if (comments) {
            res.status(200).send(comments)
        } else {
            res.sendStatus(404)
        }
    })