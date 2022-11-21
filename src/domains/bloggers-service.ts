import {bloggersRepository} from "../Repositories/bloggers-repository";
import {CreateBloggerProps, UpdateBloggerProps} from "../interfaces/interfaces";

export const bloggersService = {
    createBlogger: async ({websiteUrl, name}: CreateBloggerProps) => {
        const newBlogger = {
            id: Number(new Date()).toString(),
            name,
            websiteUrl,
        }

        return await bloggersRepository.createBlogger(newBlogger)
    },

    updateBlogger: async ({blogId, name, websiteUrl}: UpdateBloggerProps) => {
        return await bloggersRepository.updateBlogger(
            {blogId, name, websiteUrl})
    },

    deleteBlogger: async (blogId: string) => {
        return await bloggersRepository.deleteBlogger(blogId)
    },

}