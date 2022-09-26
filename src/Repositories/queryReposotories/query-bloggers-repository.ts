import {BloggersModel} from "../../DB/bloggers-scheme";
import {
    DbBloggerType,
    GetBloggerResponseType,
    GetBloggersParamsType,
    ResponseDataBloggerType
} from "../../interfaces/interfaces";

export const queryBloggersRepository = {
    getBloggers: async ({searchNameTerm, pageNumber, pageSize, sortBy, sortDirection}: GetBloggersParamsType) => {
        const findOptions = searchNameTerm ? {name: {$regex: searchNameTerm}} : {};

        const skipCount = Math.ceil((pageNumber - 1) * pageSize);

        const skipData = pageNumber ? skipCount : 0;
        const limitData = pageSize || 0;

        const totalCount = await BloggersModel.count();

        const pagesCount = Math.ceil(Number(totalCount) / pageSize) || 0;

        const sortCreateData = sortBy === 'createdAt' ? 1 : -1
        const sortNameData = sortDirection === 'asc' ? 1 : -1


        return BloggersModel.find(findOptions).skip(skipData).limit(limitData).sort({
            'createdAt': sortCreateData,
            'name': sortNameData
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
                        pageSize: Number(pageSize) || 0,
                        page: Number(pageNumber) || 0,
                        totalCount: Number(totalCount),
                        pagesCount,
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