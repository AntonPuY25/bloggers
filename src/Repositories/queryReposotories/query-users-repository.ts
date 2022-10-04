import {DbUserType, GetUsersParamsType, GetUsersResponseType, UsersType} from "../../interfaces/interfaces";
import {UsersModel} from "../../DB/users-scheme";

export const queryUsersRepository = {
    async getUsers({
                       pageNumber,
                       pageSize,
                       searchEmailTerm,
                       searchLoginTerm,
                       sortBy,
                       sortDirection
                   }: GetUsersParamsType) {

        const findData = searchEmailTerm || searchLoginTerm ? {
            $or:
                [{login: {$regex: searchLoginTerm,$options: '-i'}},
                    {email: {$regex: searchEmailTerm,$options: '-i'}}]
        } : {}


        const skipCount = (pageNumber - 1) * pageSize;
        const skipData = pageNumber ? skipCount : 0;
        const limitData = pageSize;
        const totalCount = await UsersModel.find(findData).count();
        const pagesCount = Math.ceil(Number(totalCount) / pageSize) || 0;
        const sortCreateData = sortBy ? sortBy : 'createdAt'
        const sortDirectionData = sortDirection === 'asc' ? 1 : -1

        return UsersModel.find(findData).skip(skipData).limit(limitData).sort({
            [sortCreateData]: sortDirectionData
        })
            .then((result: any) => {
                console.log(result,'result')
                if (result.length) {
                    const items = result.reduce((acc: UsersType[], item: DbUserType) => {
                        const newUser: UsersType = {
                            id: item.id,
                            email: item.email,
                            login: item.login,
                            createdAt: item.createdAt,
                        }
                        acc.push(newUser)
                        return acc
                    }, [])

                    return {
                        pagesCount,
                        page: Number(pageNumber),
                        pageSize: Number(pageSize),
                        totalCount: Number(totalCount),
                        items,


                    } as GetUsersResponseType;


                } else {
                    return {
                        pagesCount,
                        page: Number(pageNumber),
                        pageSize: Number(pageSize),
                        totalCount: Number(totalCount),
                        items: [],
                    } as GetUsersResponseType;
                }
            })
            .catch(() => null)
    },

    async deleteUser(userId: string) {
        const currentUser = await UsersModel.find({id: userId})

        if (currentUser.length) {
            return UsersModel.deleteOne({id: userId})
                .then((result: any) => result)
                .catch((error: any) => null)
        } else {
            return null
        }
    },
    getCurrentUser: async (userId: string) => {
        return UsersModel.findOne({id: userId})
            .then((result: any) => result)
            .catch((error: any) => null)
    },
}