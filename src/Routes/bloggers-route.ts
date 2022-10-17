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
import {bloggersService} from "../domains/bloggers-service";
import {ResponseDataBloggerType} from "../interfaces/interfaces";
import {queryBloggersRepository} from "../Repositories/queryReposotories/query-bloggers-repository";
import {postsService} from "../domains/posts-service";
import {queryPostsRepository} from "../Repositories/queryReposotories/query-posts-repository";
import {getBloggersData, getNewResponseBlogger} from "../helpers/helpers";
import {GetBloggersData} from "../helpers/types";

export const bloggersRoute = Router({})

bloggersRoute.get('/', async (req: Request, res: Response) => {
    const {searchNameTerm, pageNumber, pageSize, sortBy, sortDirection} = req.query;
    res.send(await queryBloggersRepository.getBloggers(getBloggersData({
        pageSize,
        sortBy,
        sortDirection,
        pageNumber,
        searchNameTerm
    } as GetBloggersData)))
})

bloggersRoute.post('/',
    nameValidator,
    urlValidator,
    errorMiddleWAre, async (req: Request, res: Response) => {
        const {name, youtubeUrl} = req.body;

        const currentBlogger = await bloggersService.createBlogger(
            {name, youtubeUrl})

        if (currentBlogger) {
            const newBlogger: ResponseDataBloggerType =
                getNewResponseBlogger(currentBlogger)

            res.status(201).send(newBlogger)
        } else {
            res.send(404)
        }


    })

bloggersRoute.post('/:blogId/posts', titleValidator, descriptionValidator, contentValidator, errorMiddleWAre, async (req: Request, res: Response) => {

    const {blogId} = req.params;
    const currentBlogger = await postsService.createPost(
        {...req.body, blogId})

    if (currentBlogger) {
        res.status(201).send(currentBlogger)
    } else {
        res.send(404)
    }

})

bloggersRoute.get('/:blogId/posts', async (req: Request, res: Response) => {
    const {blogId} = req.params;
    const {pageNumber, pageSize, sortBy, sortDirection} = req.query;

    const currentBlogger = await queryPostsRepository.getPosts({
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

})


bloggersRoute.get('/:id', async (req: Request, res: Response) => {
    const blogId = req.params.id;
    const currentBlogger = await queryBloggersRepository.getCurrentBlogger(blogId)

    if (currentBlogger && blogId) {
        const newBlogger: ResponseDataBloggerType = getNewResponseBlogger(currentBlogger)
        res.status(200).send(newBlogger)
    } else {
        res.send(404)
    }
})

bloggersRoute.put('/:id', nameValidator, urlValidator, errorMiddleWAre, async (req: Request, res: Response) => {
    const blogId = req.params.id;
    const {name, youtubeUrl} = req.body;

    const currentBlogger = await bloggersService.updateBlogger(
        {blogId, name, youtubeUrl})

    if (currentBlogger && blogId) {
        res.send(204)
    } else {
        res.send(404)
    }
})

bloggersRoute.delete('/:id', async (req: Request, res: Response) => {
    const blogId = req.params.id;
    const currentBlogger = await bloggersService.deleteBlogger(blogId)

    if (currentBlogger && blogId) {
        res.sendStatus(204)
    } else {
        res.sendStatus(404)
    }
})

