import {CreateBloggerProps, UpdateBloggerProps} from "../interfaces/interfaces";

export const bloggers = [
    {id: 1, name: 'Anton', youtubeUrl: 'https://www.youtube.com/watch?v=9CL34BQxmEs&t=9717s'},
    {id: 2, name: 'Yana', youtubeUrl: 'https://www.youtube.com/watch?v=9CL34BQxmEs&t=9717s'},
    {id: 3, name: 'Byklya', youtubeUrl: 'https://www.youtube.com/watch?v=9CL34BQxmEs&t=9717s'},
    {id: 4, name: 'Kirill', youtubeUrl: 'https://www.youtube.com/watch?v=9CL34BQxmEs&t=9717s'},
    {id: 5, name: 'Bob', youtubeUrl: 'https://www.youtube.com/watch?v=9CL34BQxmEs&t=9717s'},
]

export const bloggersRepository = {
    getBloggers: () => bloggers,
    createBlogger: ({youtubeUrl, name}: CreateBloggerProps) => {

        const newBlogger = {
            id: +(new Date()),
            name,
            youtubeUrl,
        }
        bloggers.push(newBlogger)

        return newBlogger
    },
    getCurrentBlogger: (bloggerId: number) => {

        const currentBlogger = bloggers.find(({id}) => id === bloggerId);

        if (currentBlogger) {
            return currentBlogger
        }
    },
    updateBlogger: ({bloggerId, name, youtubeUrl}: UpdateBloggerProps) => {

        const currentBloggerId = bloggers.findIndex(({id}) => id === bloggerId);

        if (currentBloggerId) {

            const currentBlogger = bloggers[currentBloggerId];

            const newBlogger = {
                id: currentBlogger.id,
                name,
                youtubeUrl,
            }
            return bloggers.splice(currentBloggerId, 1, newBlogger)
        }

    },
    deleteBlogger: (bloggerId: number) => {

        const currentBloggerId = bloggers.findIndex(({id}) => id === bloggerId);

        if (currentBloggerId) {
            return bloggers.splice(currentBloggerId, 1)
        }
    },
}