import {bloggersRepository} from "../Repositories/bloggers-repository";
import {CreateBloggerProps, UpdateBloggerProps} from "../interfaces/interfaces";

class BloggersService {
    async createBlogger({websiteUrl, name}: CreateBloggerProps) {
        const newBlogger = {
            id: Number(new Date()).toString(),
            name,
            websiteUrl,
        }

        return await bloggersRepository.createBlogger(newBlogger)
    }

    async updateBlogger({blogId, name, websiteUrl}: UpdateBloggerProps) {
        return await bloggersRepository.updateBlogger(
            {blogId, name, websiteUrl})
    }

    async deleteBlogger(blogId: string) {
        return await bloggersRepository.deleteBlogger(blogId)
    }

}

export const bloggersService = new BloggersService();