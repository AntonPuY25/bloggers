import {LikeInfoType} from "./comments-types/types";

export interface CreateBloggerProps {
    name: string
    websiteUrl: string
}

export interface UpdateBloggerProps {
    blogId: string
    name: string
    websiteUrl: string
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
    websiteUrl: string
}

export interface ResponseDataBloggerType {
    id: string
    name: string
    websiteUrl: string
    createdAt: string
}

export interface DbBloggerType {
    id: string
    name: string
    websiteUrl: string
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
    pageNumber: number,
    pageSize: number,
    sortBy: string,
    sortDirection: string,
    blogId?: string,
}

export interface GetBloggerItemsResponseType {
    id: string,
    name: string,
    websiteUrl: string,
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
    isConfirmed?: string,
    salt?: string,
}

export interface UserWithPasswordType extends UsersType {
    password: string;
}


export interface GetUsersResponseType {
    pagesCount: number,
    page: number,
    pageSize: number,
    totalCount: number,
    items: UsersType[]

}

export interface AuthRequestBodyType {
    loginOrEmail: string
    password: string
}

export interface UpdateCommentBodyParamsType {
    content: string
}

export interface CommentDataType {
    id: string,
    content: string,
    userId: string,
    userLogin: string,
    createdAt: string,
    likesInfo: LikeInfoType,
}

export interface CommentType {
    id: string,
    content: string,
    userId: string,
    userLogin: string,
    likesInfo: LikeInfoType,
    postId?: string

}

export interface CreateCommentPropsType {
    postId: string,
    userId: string,
    userLogin: string,
    content: string
}

export enum sortDirectionType  {
    asc= 'asc',
    desc= 'desc'
}

export interface GetCommentForCurrentPostType {
    pageNumber: number,
    pageSize: number,
    sortBy: string,
    sortDirection: sortDirectionType,
    postId: string,
}

export interface DbCommentsType {
    _id: string,
    id: string,
    content: string,
    userId: string,
    userLogin: string,
    postId: string,
    createdAt: string,
    updatedAt: string,
    likesInfo: LikeInfoType,
}

export interface AuthRecoveryPasswordBodyType {
    email: string
}

export interface AuthRecoveryPasswordType {
    email: string;
    code: string;
}

export interface AuthNewPasswordBodyType {
    newPassword: "string",
    recoveryCode: "string"
}