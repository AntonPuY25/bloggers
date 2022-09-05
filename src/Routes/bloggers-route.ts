import {Request, Response, Router} from "express";
import {authorizationMiddleWare, errorMiddleWAre, nameValidator, urlValidator} from "../middleWares/middleWares";
import {bloggersService} from "../services/bloggers-service";
import {ResponseDataBloggerType} from "../interfaces/interfaces";
import {queryBloggersRepository} from "../Repositories/queryReposotories/query-bloggers-repository";

export const bloggersRoute = Router({})

bloggersRoute.get('/', async (req: Request, res: Response) => {
    res.send(await queryBloggersRepository.getBloggers())
})

bloggersRoute.post('/', authorizationMiddleWare, nameValidator, urlValidator, errorMiddleWAre, async (req: Request, res: Response) => {
    const {name, youtubeUrl} = req.body;

    const currentBlogger = await bloggersService.createBlogger({name, youtubeUrl})
    if (currentBlogger) {
        const newBlogger: ResponseDataBloggerType = {
            id: currentBlogger.id,
            name: currentBlogger.name,
            youtubeUrl: currentBlogger.youtubeUrl,
            createdAt: currentBlogger.createdAt,

        }
        res.status(201).send(newBlogger)
    } else {
        res.send(404)
    }


})

bloggersRoute.get('/:id', async (req: Request, res: Response) => {
    const bloggerId = req.params.id;

    const currentBlogger = await queryBloggersRepository.getCurrentBlogger(bloggerId)


    if (currentBlogger && bloggerId) {

        const newBlogger: ResponseDataBloggerType = {
            id: currentBlogger.id,
            name: currentBlogger.name,
            youtubeUrl: currentBlogger.youtubeUrl,
            createdAt: currentBlogger.createdAt,

        }
        res.status(200).send(newBlogger)
    } else {
        res.send(404)
    }
})

bloggersRoute.put('/:id', authorizationMiddleWare, nameValidator, urlValidator, errorMiddleWAre, async (req: Request, res: Response) => {
    const bloggerId = req.params.id;
    const {name, youtubeUrl} = req.body;

    const currentBlogger = await bloggersService.updateBlogger({bloggerId, name, youtubeUrl})

    if (currentBlogger && bloggerId) {

        res.send(204)
    } else {
        res.send(404)
    }
})

bloggersRoute.delete('/:id', authorizationMiddleWare, async (req: Request, res: Response) => {
    const bloggerId = req.params.id;
    const currentBlogger = await bloggersService.deleteBlogger(bloggerId)

    if (currentBlogger && bloggerId) {
        res.sendStatus(204)
    } else {
        res.sendStatus(404)
    }
})

