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

export interface PostType {
    id: string
    title: string
    shortDescription: string
    content: string
    bloggerId: string
    bloggerName?: string
}

