export interface CreateBloggerProps {
    name: string
    youtubeUrl: string
}

export interface UpdateBloggerProps {
    bloggerId: string
    name: string
    youtubeUrl: string
}

export interface CreatePostProps {
    title: string
    shortDescription: string
    content: string
    bloggerId: string
}

export interface UpdatePostProps extends CreatePostProps {
    postId: string
}

export interface BloggerType {
    id: string
    name: string
    youtubeUrl: string
}

export interface ResponseDataBloggerType {
    id: string
    name: string
    youtubeUrl: string
    createdAt: string
}

export interface DbBloggerType {
    id: string
    name: string
    youtubeUrl: string
    createdAt: string
    _id: string
    updatedAt: string

}

export interface DbPostType {
    id: string
    createdAt: string
    _id: string
    updatedAt: string
    bloggerId: string
    bloggerName: string
    content: string
    shortDescription: string
    title: string
    __v: number
}
export interface ResponseDataPostType {
    id: string
    createdAt: string
    bloggerName: string
    content: string
    shortDescription: string
    title: string
    bloggerId: number | string
}



export interface PostType {
    id: string
    title: string
    shortDescription: string
    content: string
    bloggerId: string
    bloggerName?: string
}

