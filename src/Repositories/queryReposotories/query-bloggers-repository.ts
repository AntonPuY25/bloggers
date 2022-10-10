import {BloggersModel} from "../../DB/bloggers-scheme";
import {
    DbBloggerType,
    GetBloggerResponseType,
    GetBloggersParamsType,
    ResponseDataBloggerType
} from "../../interfaces/interfaces";
import {getPagesCountData, getSkipCountData, getSortCreatedData, getSortDirectionData} from "../../helpers/helpers";

export const queryBloggersRepository = {
    getBloggers: async ({
                            searchNameTerm,
                            pageNumber ,
                            pageSize,
                            sortBy,
                            sortDirection
                        }: GetBloggersParamsType) => {

        const findOptions = searchNameTerm ? {
                $or:
                    [{name: {$regex: searchNameTerm}},
                        {name: {$regex: searchNameTerm.toLowerCase()}}]
            }
            : {};

        const skipCount = getSkipCountData(pageNumber,pageSize);
        const skipData = pageNumber ? skipCount : 0;
        const limitData = pageSize;
        const totalCount = await BloggersModel.find(findOptions).count();
        const pagesCount = getPagesCountData(totalCount,pageSize);
        const sortCreateData = getSortCreatedData(sortBy)
        const sortDirectionData = getSortDirectionData(sortDirection)


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
                        page: pageNumber,
                        pageSize: pageSize,
                        totalCount: Number(totalCount),
                        items,
                    } as GetBloggerResponseType;
                }
            })
            .catch(() => null);
    },

    getCurrentBlogger: async (blogId: string) => {
        return BloggersModel.findOne({id: blogId})
            .then((result: any) => result)
            .catch(() => null)
    },
}