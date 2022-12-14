import bcrypt from "bcrypt";
import {GetBloggersData, GetPostsData, GetUsersDataType} from "./types";
import {ResponseDataBloggerType, sortDirectionType} from "../interfaces/interfaces";
import {UsersRepository} from "../Repositories/users-repository";

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
    websiteUrl: currentBlogger.websiteUrl,
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

export const getPagesCountData = (totalCount: number, pageSize: number) =>
    Math.ceil(Number(totalCount) / pageSize) || 0;

export const getSortCreatedData = (sortBy: string) =>
    sortBy ? sortBy : 'createdAt';

export const getSortDirectionData = (sortDirection: string) =>
    sortDirection === 'asc' ? 1 : -1;

export const isConfirmedEmailError = (field:string) => ({
        message: {
            "errorsMessages": [
                {
                    "message": "This email is already confirm",
                    "field": field
                }
            ]
        },
        isError: true
    }
)

export const duplicatedEmail = async (email:string)=>{
    const usersRepository = new UsersRepository();
    const currentUser = await usersRepository.getCurrentUserByEmail({email})
    if (currentUser) {
    return  {
            "errorsMessages": [
                {
                    "message": "This email is already exist",
                    "field": 'email'
                }
            ]
    }
    } else {
        return false;
    }
}

export const duplicatedLogin = async (login:string)=>{
    const usersRepository = new UsersRepository();
    const currentUser = await usersRepository.getCurrentUser(login)
    if (currentUser) {
        return  {
                "errorsMessages":[
                    {
                        "message": "This login is already exist",
                        "field": 'login'
                    }]

        }
    } else {
        return false;
    }
}