import {Request, Response, Router} from "express";
import {bloggersRepository} from "../Repositories/bloggers-repository";
import {errorMiddleWAre, nameValidator, urlValidator} from "../middleWares/middleWares";

export const bloggersRoute = Router({})

bloggersRoute.get('/', (req: Request, res: Response) => {
    res.send(bloggersRepository.getBloggers())
})

bloggersRoute.post('/', nameValidator, urlValidator, errorMiddleWAre, (req: Request, res: Response) => {
    const {name, youtubeUrl} = req.body;

    const currentBlogger = bloggersRepository.createBlogger({name, youtubeUrl})
    res.status(201).send(currentBlogger)

})

bloggersRoute.get('/:id', (req: Request, res: Response) => {
    const bloggerId = Number(req.params.id);

    const currentBlogger = bloggersRepository.getCurrentBlogger(bloggerId)

    if (currentBlogger) {
        res.status(201).send(currentBlogger)
    } else {
        res.send(404)
    }
})

bloggersRoute.put('/:id', nameValidator, urlValidator, errorMiddleWAre, (req: Request, res: Response) => {
    const bloggerId = Number(req.params.id);
    const {name, youtubeUrl} = req.body;

    const currentBlogger = bloggersRepository.updateBlogger({bloggerId, name, youtubeUrl})

    if (currentBlogger) {
        res.send(204)
    } else {
        res.send(404)
    }
})

bloggersRoute.delete('/:id', (req: Request, res: Response) => {
    const bloggerId = Number(req.params.id);

    const currentBlogger = bloggersRepository.deleteBlogger(bloggerId)

    if (currentBlogger) {
        res.send(204)
    } else {
        res.send(404)
    }
})

