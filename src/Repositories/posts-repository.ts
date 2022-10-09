import {PostType} from "../interfaces/interfaces";
import {bloggersRepository} from "./bloggers-repository";
import {PostsModel} from "../DB/post-scheme";


export const postsRepositories = {

    createPost: async (post: PostType) => {
        const currentBlogger = await bloggersRepository.getCurrentBlogger(post.blogId);


        if (currentBlogger) {
            post.blogName = currentBlogger.name

            const currentPost = new PostsModel(post)
            return currentPost.save()
                .then((result: any) => result)
                .catch(() => null)
        }
    },
    getCurrentPost: async (postId: string) => {
        return PostsModel.findOne({id: postId})
            .then((result: any) => result)
            .catch((error: any) => null)
    },

    updatePost: async (post: PostType, postId: string) => {

        const currentBlogger = await bloggersRepository.getCurrentBlogger(post.blogId)

        if (currentBlogger) {
            const currentPost = await postsRepositories.getCurrentPost(postId)
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
                    .catch((error: any) => null)
            } else {
                return null
            }

        } else {
            return null
        }

    },

    deletedPost: async (postId: string) => {
        const currentPost = await postsRepositories.getCurrentPost(postId)
        if (currentPost) {
            return PostsModel.deleteOne({id: postId})
                .then((result: any) => result)
                .catch((error: any) => null)
        }
    },

}