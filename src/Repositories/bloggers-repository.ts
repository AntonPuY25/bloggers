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
            .catch(() => null)
    },

    updateBlogger: async ({blogId, name, websiteUrl}: UpdateBloggerProps) => {

        const currentBlogger = await bloggersRepository.getCurrentBlogger(blogId)

        if (currentBlogger) {
            return BloggersModel.updateOne({id: blogId}, {
                $set: {
                    name,
                    websiteUrl
                }
            })
                .then((result: any) => result)
                .catch(() => null)
        } else {
            return null
        }

    },

    deleteBlogger: async (blogId: string) => {

        const currentBlogger = await bloggersRepository.getCurrentBlogger(blogId)
        if (currentBlogger) {
            return BloggersModel.deleteOne({id: blogId})
                .then((result: any) => result)
                .catch(() => null)
        } else {
            return null
        }
    },
}