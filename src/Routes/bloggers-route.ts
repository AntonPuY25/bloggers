import {Request, Response, Router} from "express";
import {
    authorizationMiddleWare,
    contentValidator,
    descriptionValidator,
    errorMiddleWAre,
    nameValidator,
    titleValidator,
    urlValidator
} from "../middleWares/middleWares";
import {ResponseDataBloggerType} from "../interfaces/interfaces";
import {getBloggersData, getNewResponseBlogger} from "../helpers/helpers";
import {GetBloggersData} from "../helpers/types";
import {QueryPostsRepository} from "../Repositories/queryReposotories/query-posts-repository";
import {QueryBloggersRepository} from "../Repositories/queryReposotories/query-bloggers-repository";
import {BloggersService} from "../domains/bloggers-service";
import {PostsService} from "../domains/posts-service";

export const bloggersRoute = Router({})

class BloggerController {
    queryPostsRepository: QueryPostsRepository;
    queryBloggersRepository: QueryBloggersRepository;
    bloggersService: BloggersService;
    postsService: PostsService;

    constructor() {
        this.queryPostsRepository = new QueryPostsRepository();
        this.queryBloggersRepository = new QueryBloggersRepository();
        this.bloggersService = new BloggersService();
        this.postsService = new PostsService();
    }

    async getBloggers(req: Request, res: Response) {
        const {searchNameTerm, pageNumber, pageSize, sortBy, sortDirection} = req.query;
        res.send(await this.queryBloggersRepository.getBloggers(getBloggersData({
            pageSize,
            sortBy,
            sortDirection,
            pageNumber,
            searchNameTerm
        } as GetBloggersData)))
    }

    async createBlogger(req: Request, res: Response) {
        const {name, websiteUrl} = req.body;

        const currentBlogger = await this.bloggersService.createBlogger(
            {name, websiteUrl})

        if (currentBlogger) {
            const newBlogger: ResponseDataBloggerType =
                getNewResponseBlogger(currentBlogger)

            res.status(201).send(newBlogger)
        } else {
            res.send(404)
        }
    }

    async createPostForCurrentBlogger(req: Request, res: Response) {

        const {blogId} = req.params;
        const currentBlogger = await this.postsService.createPost(
            {...req.body, blogId})

        if (currentBlogger) {
            res.status(201).send(currentBlogger)
        } else {
            res.send(404)
        }

    }

    async getPostForCurrentBlogger(req: Request, res: Response) {
        const {blogId} = req.params;
        const {pageNumber, pageSize, sortBy, sortDirection} = req.query;

        const currentBlogger = await  this.queryPostsRepository.getPosts({
            pageSize: pageSize ? Number(pageSize) : 10,
            pageNumber: pageNumber ? Number(pageNumber) : 1,
            sortBy: sortBy as string,
            sortDirection: sortDirection as string,
            blogId: blogId
        })

        if (currentBlogger) {
            res.status(200).send(currentBlogger)
        } else {
            res.send(404)
        }

    }

    async getCurrentBlogger(req: Request, res: Response) {
        const blogId = req.params.id;
        const currentBlogger = await this.queryBloggersRepository.getCurrentBlogger(blogId)

        if (currentBlogger && blogId) {
            const newBlogger: ResponseDataBloggerType = getNewResponseBlogger(currentBlogger)
            res.status(200).send(newBlogger)
        } else {
            res.send(404)
        }
    }

    async updateBlogger(req: Request, res: Response) {
        const blogId = req.params.id;
        const {name, websiteUrl} = req.body;

        const currentBlogger = await this.bloggersService.updateBlogger(
            {blogId, name, websiteUrl})

        if (currentBlogger && blogId) {
            res.send(204)
        } else {
            res.send(404)
        }
    }

    async deleteBlogger(req: Request, res: Response) {
        const blogId = req.params.id;
        const currentBlogger = await this.bloggersService.deleteBlogger(blogId)

        if (currentBlogger && blogId) {
            res.sendStatus(204)
        } else {
            res.sendStatus(404)
        }
    }
}

const instanceBloggerController = new BloggerController();

bloggersRoute.get('/', instanceBloggerController.getBloggers)

bloggersRoute.post('/', authorizationMiddleWare,
    nameValidator,
    urlValidator,
    errorMiddleWAre, instanceBloggerController.createBlogger)

bloggersRoute.post('/:blogId/posts', authorizationMiddleWare,
    titleValidator, descriptionValidator,
    contentValidator, errorMiddleWAre, instanceBloggerController.createPostForCurrentBlogger)

bloggersRoute.get('/:blogId/posts', instanceBloggerController.getPostForCurrentBlogger)


bloggersRoute.get('/:id', instanceBloggerController.getCurrentBlogger)

bloggersRoute.put('/:id', authorizationMiddleWare, nameValidator,
    urlValidator, errorMiddleWAre, instanceBloggerController.updateBlogger)

bloggersRoute.delete('/:id', authorizationMiddleWare,
    instanceBloggerController.deleteBlogger)

