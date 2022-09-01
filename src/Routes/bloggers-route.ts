import {Request, Response, Router} from "express";
import {bloggersRepository} from "../Repositories/bloggers-repository";
import {authorizationMiddleWare, errorMiddleWAre, nameValidator, urlValidator} from "../middleWares/middleWares";

export const bloggersRoute = Router({})

bloggersRoute.get('/', (req: Request, res: Response) => {
    res.send(bloggersRepository.getBloggers())
})

bloggersRoute.post('/', authorizationMiddleWare,nameValidator, urlValidator, errorMiddleWAre, (req: Request, res: Response) => {
    const {name, youtubeUrl} = req.body;

    const currentBlogger = bloggersRepository.createBlogger({name, youtubeUrl})
    res.status(201).send(currentBlogger)

})

bloggersRoute.get('/:id', (req: Request, res: Response) => {
    const bloggerId = req.params.id;

    const currentBlogger = bloggersRepository.getCurrentBlogger(bloggerId)

    if (currentBlogger && bloggerId) {
        res.status(200).send(currentBlogger)
    } else {
        res.send(404)
    }
})

bloggersRoute.put('/:id', authorizationMiddleWare,nameValidator, urlValidator, errorMiddleWAre, (req: Request, res: Response) => {
    const bloggerId = req.params.id;
    const {name, youtubeUrl} = req.body;

    const currentBlogger = bloggersRepository.updateBlogger({bloggerId, name, youtubeUrl})

    if (currentBlogger && bloggerId)  {
        res.send(204)
    } else {
        res.send(404)
    }
})

bloggersRoute.delete('/:id', authorizationMiddleWare,(req: Request, res: Response) => {
    const bloggerId = req.params.id;

    const currentBlogger = bloggersRepository.deleteBlogger(bloggerId)

    if (currentBlogger && bloggerId) {
        res.sendStatus(204)
    } else {
        res.sendStatus(404)
    }
})

