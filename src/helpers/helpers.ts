import bcrypt from "bcrypt";
import {GetBloggersData, GetPostsData, GetUsersDataType} from "./types";
import {ResponseDataBloggerType, sortDirectionType} from "../interfaces/interfaces";

export const getCurrentFieldError = (field: string, message: string) => {
    return {
        "errorsMessages": [
            {
                "message": message,
                "field": field
            }
        ]
    }
}

export const getGeneratedHashPassword = async (password: string, salt: string) => {
    return await bcrypt.hash(password, salt)
}

export const getBloggersData = ({pageSize, sortBy, sortDirection, pageNumber, searchNameTerm}
                                    : GetBloggersData) => ({
    pageSize: pageSize ? Number(pageSize) : 10,
    pageNumber: pageNumber ? Number(pageNumber) : 1,
    sortBy: sortBy as string,
    sortDirection: sortDirection as sortDirectionType,
    searchNameTerm: searchNameTerm as string

})

export const getNewResponseBlogger = (currentBlogger: ResponseDataBloggerType) => ({
    id: currentBlogger.id,
    name: currentBlogger.name,
    youtubeUrl: currentBlogger.youtubeUrl,
    createdAt: currentBlogger.createdAt,
})

export const getPostsData = ({pageSize, pageNumber, sortDirection, sortBy}: GetPostsData) => ({
    pageSize: pageSize ? Number(pageSize) : 10,
    pageNumber: pageNumber ? Number(pageNumber) : 1,
    sortBy: sortBy as string,
    sortDirection: sortDirection as sortDirectionType,
})

export const getUsersData = ({
                                 pageSize,
                                 sortBy,
                                 sortDirection,
                                 searchEmailTerm,
                                 searchLoginTerm,
                                 pageNumber
                             }: GetUsersDataType) => ({
    pageNumber: pageNumber ? Number(pageNumber) : 1,
    pageSize: pageSize ? Number(pageSize) : 10,
    sortBy: sortBy ? sortBy : 'createdAt',
    sortDirection: sortDirection ? sortDirection : 'desc',
    searchLoginTerm: searchLoginTerm || '',
    searchEmailTerm: searchEmailTerm || '',
})

export const getSkipCountData = (pageNumber: number, pageSize: number) =>
    (pageNumber - 1) * pageSize;

export const getPagesCountData = (totalCount: number,pageSize: number)=>
    Math.ceil(Number(totalCount) / pageSize) || 0;

export const getSortCreatedData = (sortBy: string)=>
    sortBy ? sortBy : 'createdAt';

export const getSortDirectionData = (sortDirection: string)=>
    sortDirection === 'asc' ? 1 : -1;
