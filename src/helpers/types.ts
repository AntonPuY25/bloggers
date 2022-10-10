import {sortDirectionType} from "../interfaces/interfaces";

export interface GetBloggersData {
    searchNameTerm?: string,
    pageNumber?: string,
    pageSize?: string,
    sortBy?: string,
    sortDirection?: sortDirectionType
}

export interface GetPostsData {
    pageNumber?:string,
    pageSize?: string,
    sortBy?: string,
    sortDirection?: sortDirectionType
}

export interface GetUsersDataType {
    pageNumber: string,
    pageSize: string,
    sortBy: string,
    sortDirection: sortDirectionType,
    searchLoginTerm: string,
    searchEmailTerm: string,
}