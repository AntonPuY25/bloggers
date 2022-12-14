import {postsRepositories} from "../Repositories/posts-repository";
import {CreatePostProps, DbPostType, UpdatePostProps} from "../interfaces/interfaces";
import {Post, PostFromBd} from "../instances/posts";

class PostsService {
    async createPost({content, blogId, shortDescription, title}: CreatePostProps) {
        const newPost = new Post(Number(new Date()).toString(),
            title,
            shortDescription,
            content,
            blogId.toString())


        const postFromBd: DbPostType = await postsRepositories.createPost(newPost)

        if (postFromBd) {
            return new PostFromBd(
                postFromBd.id,
                postFromBd.createdAt,
                postFromBd.content,
                postFromBd.shortDescription,
                postFromBd.title,
                postFromBd.blogName,
                postFromBd.blogId.toString())

        }
    }

    async updatePost({content, blogId, shortDescription, title, postId}: UpdatePostProps) {

        const newPost = {
            id: postId,
            title,
            shortDescription,
            content,
            blogId: blogId.toString(),
        }

        return await postsRepositories.updatePost(newPost, postId)
    }

    async deletedPost(postId: string) {
        return await postsRepositories.deletedPost(postId)
    }
}

export const postsService = new PostsService()