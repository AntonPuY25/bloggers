import {PostsModel} from "../../DB/post-scheme";
import {DbPostType, GetPostsParamsType, GetPostsResponseType, ResponseDataPostType} from "../../interfaces/interfaces";

export const queryPostsRepository = {
    getPosts: async ({blogId, sortBy, sortDirection, pageNumber=1, pageSize=10}: GetPostsParamsType) => {
        const postsFilterData = blogId ? {blogId: blogId} : {}
        const skipCount = (pageNumber - 1) * pageSize;

        console.log(sortDirection,'sortDirection')

        const skipData = pageNumber ? skipCount : 0;
        const limitData = pageSize;
        const totalCount = await PostsModel.find(postsFilterData).count();
        const pagesCount = Math.ceil(Number(totalCount) / pageSize) || 0;
        const sortCreateData = sortBy ? sortBy : 'createdAt'
        const sortDirectionData = sortDirection === 'asc'|| !sortDirection  ? 1 : -1



        return PostsModel.find(postsFilterData).skip(skipData).limit(limitData).sort({
            [sortCreateData] : sortDirectionData
        })
            .then((result: any) => {
                if (result.length) {
                    const items = result.reduce((acc: ResponseDataPostType[], item: DbPostType) => {
                        const newPost: ResponseDataPostType = {
                            id: item.id,
                            title: item.title,
                            shortDescription: item.shortDescription,
                            content: item.content,
                            blogId: item.blogId.toString(),
                            blogName: item.blogName,
                            createdAt: item.createdAt,
                        }
                        acc.push(newPost)
                        return acc
                    }, [])

                        return {
                            pagesCount,
                            page: Number(pageNumber),
                            pageSize: Number(pageSize),
                            totalCount: Number(totalCount),
                            items,


                        } as GetPostsResponseType;


                } else {
                    return null
                }
            })
            .catch(() => null)
    },

    getCurrentPost: async (postId: string) => {
        return PostsModel.findOne({id: postId})
            .then((result: any) => {
                if (result) {
                    const responsePost: ResponseDataPostType = {
                        id: result.id,
                        createdAt: result.createdAt,
                        content: result.content,
                        shortDescription: result.shortDescription,
                        title: result.title,
                        blogName: result.blogName,
                        blogId: result.blogId.toString(),
                    }
                    return responsePost
                } else {
                    return null
                }
            })
            .catch((error: any) => null)
    },
}