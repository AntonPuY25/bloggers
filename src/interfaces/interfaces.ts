export interface CreateBloggerProps  {
    name: string;
    youtubeUrl: string;
}

export interface UpdateBloggerProps  {
    bloggerId: string;
    name: string;
    youtubeUrl: string;
}

export interface CreatePostProps {
    title: string,
    shortDescription: string,
    content: string,
    bloggerId: number
}

export interface UpdatePostProps extends CreatePostProps {
   postId:number
}