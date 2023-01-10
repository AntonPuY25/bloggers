import {BloggerType, UpdateBloggerProps} from "../interfaces/interfaces";
import {BloggersModel} from "../DB/bloggers-scheme";


export class BloggersRepository {
    async createBlogger(newBlogger: BloggerType) {
        const currentBlogger = new BloggersModel(newBlogger)

        return currentBlogger.save()
            .then((result: any) => result)
            .catch(() => null)
    }

    async getCurrentBlogger(blogId: string) {

        return BloggersModel.findOne({id: blogId})
            .then((result: any) => result)
            .catch(() => null)
    }

    async updateBlogger({blogId, name, websiteUrl}: UpdateBloggerProps) {

        const currentBlogger = await this.getCurrentBlogger(blogId)

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

    }

    async deleteBlogger(blogId: string) {

        const currentBlogger = await this.getCurrentBlogger(blogId)
        if (currentBlogger) {
            return BloggersModel.deleteOne({id: blogId})
                .then((result: any) => result)
                .catch(() => null)
        } else {
            return null
        }
    }
}