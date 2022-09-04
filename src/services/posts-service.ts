import {postsRepositories} from "../Repositories/posts-repository";
import {CreatePostProps, UpdatePostProps} from "../interfaces/interfaces";

export const postsService = {
    getPosts: async () => await postsRepositories.getPosts(),

    createPost: async ({content, bloggerId, shortDescription, title}: CreatePostProps) => {
        const newPost = {
            id: Number(new Date()).toString(),
            title,
            shortDescription,
            content,
            bloggerId: bloggerId.toString(),
        }

        return await postsRepositories.createPost(newPost)
    },

    updatePost: async ({content, bloggerId, shortDescription, title, postId}: UpdatePostProps) => {

        const newPost = {
            id: Number(new Date()).toString(),
            title,
            shortDescription,
            content,
            bloggerId: bloggerId.toString(),
        }

        return await postsRepositories.updatePost(newPost, postId)
    },

    getCurrentPost: async (postId: string) => {
        return await postsRepositories.getCurrentPost(postId)
    },

    deletedPost: async (postId: string) => {
        return await postsRepositories.deletedPost(postId)
    },
}