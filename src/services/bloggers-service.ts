import {bloggersRepository} from "../Repositories/bloggers-repository";
import {CreateBloggerProps, DbBloggerType, ResponseDataBloggerType, UpdateBloggerProps} from "../interfaces/interfaces";

export const bloggersService = {
    getBloggers: async () => {
        const bloggers = await bloggersRepository.getBloggers();

      if(bloggers){
          return bloggers.reduce((acc:ResponseDataBloggerType[],item:DbBloggerType)=>{
              const newBlogger: ResponseDataBloggerType = {
                  id: item.id,
                  name: item.name,
                  youtubeUrl: item.youtubeUrl,
                  createdAt: item.createdAt,

              }
              acc.push(newBlogger)
              return acc
          },[])
      }else{
          return  null
      }
    },

    createBlogger: async ({youtubeUrl, name}: CreateBloggerProps) => {

        const newBlogger = {
            id: Number(new Date()).toString(),
            name,
            youtubeUrl,
        }

        return await bloggersRepository.createBlogger(newBlogger)

    },

    getCurrentBlogger: async (bloggerId: string) => {
        return await bloggersRepository.getCurrentBlogger(bloggerId);
    },

    updateBlogger: async ({bloggerId, name, youtubeUrl}: UpdateBloggerProps) => {
        return await bloggersRepository.updateBlogger({bloggerId, name, youtubeUrl})

    },

    deleteBlogger: async (bloggerId: string) => {
        return await bloggersRepository.deleteBlogger(bloggerId)
    },
}