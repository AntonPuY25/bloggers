export interface CreateBloggerProps {
    name: string
    youtubeUrl: string
}

export interface UpdateBloggerProps {
    blogId: string
    name: string
    youtubeUrl: string
}

export interface CreatePostProps {
    title: string
    shortDescription: string
    content: string
    blogId: string
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
    blogId: string
    blogName: string
    content: string
    shortDescription: string
    title: string
    __v: number
}

export interface ResponseDataPostType {
    id: string
    createdAt: string
    blogName: string
    content: string
    shortDescription: string
    title: string
    blogId: number | string
}


export interface PostType {
    id: string
    title: string
    shortDescription: string
    content: string
    blogId: string
    blogName?: string
}

export interface GetBloggersParamsType {
    searchNameTerm: string,
    pageNumber: number,
    pageSize: number,
    sortBy: string,
    sortDirection: string,
}

export interface GetPostsParamsType {
    blogId?: string,
    pageNumber?: number,
    pageSize?: number,
    sortBy?: string,
    sortDirection?: string,
}

export interface GetBloggerItemsResponseType {
    id: string,
    name: string,
    youtubeUrl: string,
    createdAt: string

}


export interface GetBloggerResponseType {
    pagesCount: number,
    page: number,
    pageSize: number,
    totalCount: number,
    items: GetBloggerItemsResponseType[]

}

export interface GetPostsResponseType extends GetBloggerResponseType {
};

export interface GetUsersParamsType {
    searchLoginTerm?: string,
    searchEmailTerm?: string,
    pageNumber: number,
    pageSize: number,
    sortBy: string,
    sortDirection: string,
}

export interface GetUsersParamsRequestType {
    searchLoginTerm?: string,
    searchEmailTerm?: string,
    pageNumber?: string,
    pageSize?: string,
    sortBy?: string,
    sortDirection?: string,
}

export interface UsersType {
    id: string,
    login: string,
    email: string,
    createdAt?: string,
}

export interface UserWithPasswordType extends UsersType {
    password: string;
}

export interface DbUserType {
    id: string
    createdAt: string
    _id: string
    updatedAt: string
    login: string
    email: string
    __v: number
}
export interface GetUsersResponseType {
    pagesCount: number,
    page: number,
    pageSize: number,
    totalCount: number,
    items: UsersType[]

}

export interface CreateUserRequestBodyType {
    login: string
    password: string
    email: string
}

export interface AuthRequestBodyType {
    login: string
    password: string
}

export interface UpdateCommentBodyParamsType {
    content: string
}
