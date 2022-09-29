import {BloggersModel} from "../../DB/bloggers-scheme";
import {
    DbBloggerType,
    GetBloggerResponseType,
    GetBloggersParamsType,
    ResponseDataBloggerType
} from "../../interfaces/interfaces";

export const queryBloggersRepository = {
    getBloggers: async ({
                            searchNameTerm,
                            pageNumber = 1,
                            pageSize = 10,
                            sortBy,
                            sortDirection
                        }: GetBloggersParamsType) => {

        const findOptions = searchNameTerm ? {
                $or:
                    [{name: {$regex: searchNameTerm}},
                        {name: {$regex: searchNameTerm.toLowerCase()}}]
            }
            : {};

        const skipCount = (pageNumber - 1) * pageSize;

        const skipData = pageNumber ? skipCount : 0;
        const limitData = pageSize;

        const totalCount = await BloggersModel.find(findOptions).count();

        const pagesCount = Math.ceil(Number(totalCount) / pageSize) || 0;


        const sortCreateData = sortBy ? sortBy : 'createdAt'
        const sortDirectionData = sortDirection === 'asc' ? 1 : -1


        return BloggersModel.find(findOptions).skip(skipData).limit(limitData).sort({
            [sortCreateData]: sortDirectionData
        })
            .then((result: any) => {
                if (result) {
                    const items = result.reduce((acc: ResponseDataBloggerType[], item: DbBloggerType) => {
                        const newBlogger: ResponseDataBloggerType = {
                            id: item.id,
                            name: item.name,
                            youtubeUrl: item.youtubeUrl,
                            createdAt: item.createdAt,

                        }
                        acc.push(newBlogger)
                        return acc
                    }, [])

                    return {
                        pagesCount,
                        page: Number(pageNumber),
                        pageSize: Number(pageSize),
                        totalCount: Number(totalCount),
                        items,


                    } as GetBloggerResponseType;
                }
            })
            .catch((error: any) => null);
    },
    getCurrentBlogger: async (blogId: string) => {
        return BloggersModel.findOne({id: blogId})
            .then((result: any) => result)
            .catch((error: any) => null)
    },
}