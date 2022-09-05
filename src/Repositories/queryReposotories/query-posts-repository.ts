import {PostsModel} from "../../DB/post-scheme";
import {DbPostType, ResponseDataPostType} from "../../interfaces/interfaces";

export const queryPostsRepository = {
    getPosts: async () => {
        return PostsModel.find()
            .then((result: any) => {
                if (result) {
                    return result.reduce((acc: ResponseDataPostType[], item: DbPostType) => {
                        const newPost: ResponseDataPostType = {
                            bloggerId: item.bloggerId.toString(),
                            bloggerName: item.bloggerName,
                            content: item.content,
                            createdAt: item.createdAt,
                            id: item.id,
                            shortDescription: item.shortDescription,
                            title: item.title,
                        }
                        acc.push(newPost)
                        return acc
                    }, [])
                } else {
                    return null
                }
            })
            .catch(() => null)
    },
    getCurrentPost: async (postId: string) => {
        return PostsModel.findOne({id: postId})
            .then((result: any) => {
                if(result){
                    const responsePost: ResponseDataPostType = {
                        id: result.id,
                        createdAt: result.createdAt,
                        content: result.content,
                        shortDescription: result.shortDescription,
                        title: result.title,
                        bloggerName: result.bloggerName,
                        bloggerId: result.bloggerId.toString(),
                    }
                    return responsePost
                }else{
                    return null
                }
            })
            .catch((error: any) => null)
    },
}