import {BloggersModel} from "../DB/bloggers-scheme";
import {PostsModel} from "../DB/post-scheme";
import {UsersModel} from "../DB/users-scheme";
import {CommentsModel} from "../DB/comments-scheme";


export const testingRepository = {
    allClear: async () => {
        await BloggersModel.deleteMany({})
        await PostsModel.deleteMany({})
        await UsersModel.deleteMany({})
        await CommentsModel.deleteMany({})
        return {
            success: true
        }

    }
}