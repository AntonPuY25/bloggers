import {PostType} from "../interfaces/interfaces";
import {PostsModel} from "../DB/post-scheme";
import {BloggersRepository} from "./bloggers-repository";

export class PostsRepositories {
    bloggersRepository: BloggersRepository;

    constructor() {
        this.bloggersRepository = new BloggersRepository();
    }

    async createPost(post: PostType) {
        const currentBlogger = await this.bloggersRepository.getCurrentBlogger(post.blogId);

        if (currentBlogger) {
            post.blogName = currentBlogger.name

            const currentPost = new PostsModel(post)

            return currentPost.save()
                .then((result: any) => result)
                .catch(() => null)
        }
    }

    async getCurrentPost(postId: string) {
        return PostsModel.findOne({id: postId})
            .then((result: any) => result)
            .catch(() => null)
    }

    async updatePost(post: PostType, postId: string) {
        const currentBlogger = await this.bloggersRepository.getCurrentBlogger(post.blogId)

        if (!currentBlogger) return null

        const currentPost = await this.getCurrentPost(postId)
        if (currentPost) {
            post.blogName = currentBlogger.name
            return PostsModel.updateOne({id: postId}, {
                $set: {
                    title: post.title,
                    shortDescription: post.shortDescription,
                    content: post.content
                }

            })
                .then((result: any) => result)
                .catch(() => null)
        } else {
            return null
        }
    }

    async deletedPost(postId: string) {
        const currentPost =  await this.getCurrentPost(postId)

        if (currentPost) {
            return PostsModel.deleteOne({id: postId})
                .then((result: any) => result)
                .catch(() => null)
        }
    }
}