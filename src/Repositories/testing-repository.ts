import {BloggersModel} from "../DB/bloggers-scheme";
import {PostsModel} from "../DB/post-scheme";


export const testingRepository = {
    allClear: async ()=>{
       await BloggersModel.deleteMany({})
       await PostsModel.deleteMany({})
        return {
            success: true
        }

    }
}