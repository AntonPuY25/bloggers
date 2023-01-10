import {CreateBloggerProps, UpdateBloggerProps} from "../interfaces/interfaces";
import {BloggersRepository} from "../Repositories/bloggers-repository";

export class BloggersService {
    bloggersRepository: BloggersRepository;

    constructor() {
        this.bloggersRepository = new BloggersRepository();
    }

    async createBlogger({websiteUrl, name}: CreateBloggerProps) {
        const newBlogger = {
            id: Number(new Date()).toString(),
            name,
            websiteUrl,
        }

        return await  this.bloggersRepository.createBlogger(newBlogger)
    }

    async updateBlogger({blogId, name, websiteUrl}: UpdateBloggerProps) {
        return await  this.bloggersRepository.updateBlogger(
            {blogId, name, websiteUrl})
    }

    async deleteBlogger(blogId: string) {
        return await  this.bloggersRepository.deleteBlogger(blogId)
    }

}
