import {BloggersModel} from "../../DB/bloggers-scheme";
import {DbBloggerType, ResponseDataBloggerType} from "../../interfaces/interfaces";

export const queryBloggersRepository = {
    getBloggers: async () => {
        return BloggersModel.find().sort({"name":-1})
            .then((result: any) => {
                if(result){
                    return result.reduce((acc:ResponseDataBloggerType[],item:DbBloggerType)=>{
                        const newBlogger: ResponseDataBloggerType = {
                            id: item.id,
                            name: item.name,
                            youtubeUrl: item.youtubeUrl,
                            createdAt: item.createdAt,

                        }
                        acc.push(newBlogger)
                        return acc
                    },[])
                }
            })
            .catch((error: any) => null);
    },
    getCurrentBlogger: async (bloggerId: string) => {
        return BloggersModel.findOne({id: bloggerId})
            .then((result: any) => result)
            .catch((error: any) => null)
    },
}