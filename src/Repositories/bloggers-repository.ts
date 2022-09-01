import {CreateBloggerProps, UpdateBloggerProps} from "../interfaces/interfaces";
import {bloggers} from "../DB/store";



export const bloggersRepository = {
    getBloggers: () => bloggers,
    createBlogger: ({youtubeUrl, name}: CreateBloggerProps) => {

        const newBlogger = {
            id: Number(new Date()).toString(),
            name,
            youtubeUrl,
        }
        bloggers.push(newBlogger)

        return newBlogger
    },
    getCurrentBlogger: (bloggerId: string) => {

        const currentBlogger = bloggers.find(({id}) => id === bloggerId);

        if (currentBlogger) {
            return currentBlogger
        }
    },
    updateBlogger: ({bloggerId, name, youtubeUrl}: UpdateBloggerProps) => {

        const currentBloggerId = bloggers.findIndex(({id}) => id === bloggerId);

        if (currentBloggerId !== -1) {
            const currentBlogger = bloggers[currentBloggerId];
            const newBlogger = {
                id: currentBlogger.id,
                name,
                youtubeUrl,
            }
            return bloggers.splice(currentBloggerId, 1, newBlogger)
        }

    },
    deleteBlogger: (bloggerId: string) => {

        const currentBloggerId = bloggers.findIndex(({id}) => id === bloggerId);

        if (currentBloggerId !== -1) {
            return bloggers.splice(currentBloggerId, 1)
        }
    },
}