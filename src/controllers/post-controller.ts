import {CommentsRepository} from "../Repositories/comments-repository";
import {QueryPostsRepository} from "../Repositories/queryReposotories/query-posts-repository";
import {PostsService} from "../domains/posts-service";
import {Request, Response} from "express";
import {getCurrentFieldError, getPostsData} from "../helpers/helpers";
import {GetPostsData} from "../helpers/types";
import {sortDirectionType, UpdateCommentBodyParamsType} from "../interfaces/interfaces";
import {postsRepositories} from "../compositionRoots/compositions-root";

export class PostController {

    constructor(protected commentsRepository: CommentsRepository,
                protected queryPostsRepository: QueryPostsRepository,
                protected postsService: PostsService,
    ) {}

    async getPosts(req: Request, res: Response) {

        const {pageNumber, pageSize, sortBy, sortDirection} = req.query;
        res.send(await this.queryPostsRepository.getPosts(getPostsData({
            pageSize,
            pageNumber,
            sortBy,
            sortDirection
        } as GetPostsData)))
    }

    async createPost(req: Request, res: Response) {
        const currentPost = await this.postsService.createPost(req.body)

        if (currentPost) {
            res.status(201).send(currentPost)
        } else {
            res.status(400).send(getCurrentFieldError('blogId', 'This blogger not found'))
        }

    }

    async getCurrentPost(req: Request, res: Response) {
        const postId = req.params.id;

        const currentPost = await this.queryPostsRepository.getCurrentPost(postId)
        if (currentPost) {
            res.send(currentPost)
        } else {
            res.send(404)
        }
    }

    async updatePost(req: Request, res: Response) {
        const postId = req.params.id;

        const currentPost = await this.postsService.updatePost(
            {...req.body, postId})

        if (currentPost) {
            res.send(204)
        } else {
            res.send(404)
        }
    }

    async deletedPost(req: Request, res: Response) {
        const postId = req.params.id;

        const currentPost = await this.postsService.deletedPost(postId)
        if (currentPost) {
            res.send(204)
        } else {
            res.send(404)
        }
    }

    async createCommentForCurrentPost(req: Request<{ postId: string }, {}, UpdateCommentBodyParamsType, {}>,
                                      res: Response) {

        const {postId} = req.params;
        const {content} = req.body;
        const {id} = req?.user!;

        const currentPost = await postsRepositories.getCurrentPost(postId)

        if (!currentPost) return res.sendStatus(404)

        const currentComment = await this.commentsRepository.createComment({
            postId,
            content,
            userId: id,
            userLogin: req?.user?.userData?.login!,
        })

        if (currentComment) {
            res.status(201).send(currentComment)
        } else {
            res.sendStatus(404)
        }
    }

    async getCommentForCurrentPost(req: Request<{ postId: string }, {}, {}, {
        pageNumber: string,
        pageSize: string,
        sortBy: string,
        sortDirection: sortDirectionType
    }>, res: Response) {
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


        const comments = await this.commentsRepository.getCommentsForCurrentPost(
            {postId, ...postData})

        if (comments) {
            res.status(200).send(comments)
        } else {
            res.sendStatus(404)
        }
    }

}