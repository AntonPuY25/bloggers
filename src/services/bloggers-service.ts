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

    updateBlogger: async ({bloggerId, name, youtubeUrl}: UpdateBloggerProps) => {
        return await bloggersRepository.updateBlogger({bloggerId, name, youtubeUrl})

    },

    deleteBlogger: async (bloggerId: string) => {
        return await bloggersRepository.deleteBlogger(bloggerId)
    },
}