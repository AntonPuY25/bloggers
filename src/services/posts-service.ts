import {postsRepositories} from "../Repositories/posts-repository";
import {CreatePostProps, DbPostType, ResponseDataPostType, UpdatePostProps} from "../interfaces/interfaces";

export const postsService = {

    createPost: async ({content, bloggerId, shortDescription, title}: CreatePostProps) => {
        const newPost = {
            id: Number(new Date()).toString(),
            title,
            shortDescription,
            content,
            bloggerId: bloggerId.toString(),
        }

        const postFromBd: DbPostType = await postsRepositories.createPost(newPost)

        if (postFromBd) {
            return {
                id: postFromBd.id,
                createdAt: postFromBd.createdAt,
                content: postFromBd.content,
                shortDescription: postFromBd.shortDescription,
                title: postFromBd.title,
                bloggerName: postFromBd.bloggerName,
                bloggerId: postFromBd.bloggerId.toString(),
            }
        }
    },

    updatePost: async ({content, bloggerId, shortDescription, title, postId}: UpdatePostProps) => {

        const newPost = {
            id: postId,
            title,
            shortDescription,
            content,
            bloggerId: bloggerId.toString(),
        }

        return await postsRepositories.updatePost(newPost, postId)
    },

    deletedPost: async (postId: string) => {
        return await postsRepositories.deletedPost(postId)
    },
}