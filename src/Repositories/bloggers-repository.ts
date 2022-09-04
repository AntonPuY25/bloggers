import {BloggerType, UpdateBloggerProps} from "../interfaces/interfaces";
import {BloggersModel} from "../DB/bloggers-scheme";


export const bloggersRepository = {
    getBloggers: async () => {
        return BloggersModel.find()
            .then((result: any) => result)
            .catch((error: any) => null);
    },

    createBlogger: async (newBlogger: BloggerType) => {
        const currentBlogger = new BloggersModel(newBlogger)

        return currentBlogger.save()
            .then((result: any) => result)
            .catch(() => null)
    },

    getCurrentBlogger: async (bloggerId: string) => {

        return BloggersModel.findOne({id: bloggerId})
            .then((result: any) => result)
            .catch((error: any) => null)
    },
    updateBlogger: async ({bloggerId, name, youtubeUrl}: UpdateBloggerProps) => {

        const currentBlogger = await bloggersRepository.getCurrentBlogger(bloggerId)

        if (currentBlogger) {
            return BloggersModel.updateOne({id: bloggerId}, {
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
    deleteBlogger: async (bloggerId: string) => {

        const currentBlogger = await bloggersRepository.getCurrentBlogger(bloggerId)

        if (currentBlogger) {
            return BloggersModel.deleteOne({id: bloggerId})
                .then((result: any) => result)
                .catch((error: any) => null)
        } else {
            return null
        }
    },
}