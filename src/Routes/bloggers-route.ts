import {Router} from "express";
import {
    authorizationMiddleWare,
    contentValidator,
    descriptionValidator,
    errorMiddleWAre,
    nameValidator,
    titleValidator,
    urlValidator
} from "../middleWares/middleWares";
import {bloggerController} from "../compositionRoots/compositions-root";

export const bloggersRoute = Router({})

bloggersRoute.get('/', bloggerController.getBloggers.bind(bloggerController))

bloggersRoute.post('/', authorizationMiddleWare,
    nameValidator,
    urlValidator,
    errorMiddleWAre, bloggerController.createBlogger.bind(bloggerController))

bloggersRoute.post('/:blogId/posts', authorizationMiddleWare,
    titleValidator, descriptionValidator,
    contentValidator, errorMiddleWAre, bloggerController.createPostForCurrentBlogger.bind(bloggerController))

bloggersRoute.get('/:blogId/posts', bloggerController.getPostForCurrentBlogger.bind(bloggerController))


bloggersRoute.get('/:id', bloggerController.getCurrentBlogger.bind(bloggerController))

bloggersRoute.put('/:id', authorizationMiddleWare, nameValidator,
    urlValidator, errorMiddleWAre, bloggerController.updateBlogger.bind(bloggerController))

bloggersRoute.delete('/:id', authorizationMiddleWare,
    bloggerController.deleteBlogger.bind(bloggerController))

