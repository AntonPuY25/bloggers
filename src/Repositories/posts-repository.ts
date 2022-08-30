import {CreatePostProps, UpdatePostProps} from "../interfaces/interfaces";
import {bloggers} from "./bloggers-repository";

const posts: any[] = []

export const postsRepositories = {
    getPosts: () => posts,

    createPost: ({content, bloggerId, shortDescription, title}: CreatePostProps) => {
        const currentBlogger = bloggers.find(({id}) => id === Number(bloggerId));

        if (currentBlogger) {
            const newPost = {
                id: Number(new Date()),
                title,
                shortDescription,
                content,
                bloggerId: Number(bloggerId),
                bloggerName: currentBlogger.name
            }

            posts.push(newPost)

            return newPost;
        }

    },
    getCurrentPost: (postId: number) => {
        const currentPost = posts.find(({id}) => id === postId)

        if (currentPost) {
            return currentPost;
        }
    },

    updatePost: ({content, bloggerId, shortDescription, title, postId}: UpdatePostProps) => {
        const currentBlogger = bloggers.find(({id}) => id === Number(bloggerId));
        if (currentBlogger) {
            const currentPostId = posts.findIndex(({id}) => id === postId)
            if (currentPostId !== -1) {
                const newPost = {
                    id: postId,
                    title,
                    shortDescription,
                    content,
                    bloggerId: Number(bloggerId),
                    bloggerName: currentBlogger.name
                }
                return posts.splice(currentPostId, 1, newPost)
            }

        }

    },

    deletedPost: (postId: number) => {
        console.log(postId, 'postId')
        const currentPostId = posts.findIndex(({id}) => id === postId)
        console.log(currentPostId, 'currentPostId')

        if (currentPostId !== -1) {
            return posts.splice(currentPostId, 1);
        }
    },
}