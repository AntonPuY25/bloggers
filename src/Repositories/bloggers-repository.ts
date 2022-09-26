import {BloggerType, UpdateBloggerProps} from "../interfaces/interfaces";
import {BloggersModel} from "../DB/bloggers-scheme";


export const bloggersRepository = {

    createBlogger: async (newBlogger: BloggerType) => {
        const currentBlogger = new BloggersModel(newBlogger)

         return currentBlogger.save()
            .then((result: any) => result)
            .catch(() => null)
    },

    getCurrentBlogger: async (blogId: string) => {

        return BloggersModel.findOne({id: blogId})
            .then((result: any) => result)
            .catch((error: any) => null)
    },

    updateBlogger: async ({blogId, name, youtubeUrl}: UpdateBloggerProps) => {

        const currentBlogger = await bloggersRepository.getCurrentBlogger(blogId)

        if (currentBlogger) {
            return BloggersModel.updateOne({id: blogId}, {
                $set: {
                    name,
                    youtubeUrl
                }
            })
                .then((result: any) => result)
                .catch((error: any) => null)
        } else {
            return null
        }

    },
    deleteBlogger: async (blogId: string) => {

        const currentBlogger = await bloggersRepository.getCurrentBlogger(blogId)

        if (currentBlogger) {
            return BloggersModel.deleteOne({id: blogId})
                .then((result: any) => result)
                .catch((error: any) => null)
        } else {
            return null
        }
    },
}