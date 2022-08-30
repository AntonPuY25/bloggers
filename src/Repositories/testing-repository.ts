import {bloggers, posts} from "../DB/store";


export const testingRepository = {
    allClear: ()=>{
        posts.splice(0)
        bloggers.splice(0)
        return {
            success: true
        }

    }
}