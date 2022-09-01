import {CreatePostProps, UpdatePostProps} from "../interfaces/interfaces";
import {bloggers, posts} from "../DB/store";


export const postsRepositories = {
    getPosts: () => posts,

    createPost: ({content, bloggerId, shortDescription, title}: CreatePostProps) => {
        const currentBlogger = bloggers.find(({id}) => id === bloggerId);

        if (currentBlogger) {
            const newPost = {
                id: Number(new Date()).toString(),
                title,
                shortDescription,
                content,
                bloggerId: bloggerId.toString(),
                bloggerName: currentBlogger.name
            }

            posts.push(newPost)
            return newPost;
        }
    },
    getCurrentPost: (postId: string) => {
        const currentPost = posts.find(({id}) => id === postId)

        if (currentPost) {
            return currentPost;
        }
    },

    updatePost: ({content, bloggerId, shortDescription, title, postId}: UpdatePostProps) => {
        const currentBlogger = bloggers.find(({id}) => id === bloggerId);
        if (currentBlogger) {
            const currentPostId = posts.findIndex(({id}) => id === postId)
            if (currentPostId !== -1) {
                const newPost = {
                    id: postId.toString(),
                    title,
                    shortDescription,
                    content,
                    bloggerId: bloggerId.toString(),
                    bloggerName: currentBlogger.name
                }
                return posts.splice(currentPostId, 1, newPost)
            }
        }

    },

    deletedPost: (postId: string) => {
        const currentPostId = posts.findIndex(({id}) => id === postId)
        if (currentPostId !== -1) {
            return posts.splice(currentPostId, 1);
        }
    },
}