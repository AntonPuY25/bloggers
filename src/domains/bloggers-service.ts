import {bloggersRepository} from "../Repositories/bloggers-repository";
import {CreateBloggerProps, UpdateBloggerProps} from "../interfaces/interfaces";

export const bloggersService = {
    createBlogger: async ({youtubeUrl, name}: CreateBloggerProps) => {
        const newBlogger = {
            id: Number(new Date()).toString(),
            name,
            youtubeUrl,
        }

        return await bloggersRepository.createBlogger(newBlogger)
    },

    updateBlogger: async ({blogId, name, youtubeUrl}: UpdateBloggerProps) => {
        return await bloggersRepository.updateBlogger(
            {blogId, name, youtubeUrl})
    },

    deleteBlogger: async (blogId: string) => {
        return await bloggersRepository.deleteBlogger(blogId)
    },

}