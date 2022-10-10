import {
    CommentDataType,
    CommentType,
    CreateCommentPropsType, DbCommentsType,
    GetCommentForCurrentPostType
} from "../interfaces/interfaces";
import {CommentsModel} from "../DB/comments-scheme";
import {UsersModel} from "../DB/users-scheme";
import {PostsModel} from "../DB/post-scheme";

export const commentsRepository = {
    async createComment({content, userId, postId, userLogin}: CreateCommentPropsType) {

        const currentComment: CommentType = {
            id: Number(new Date()).toString(),
            content,
            userId,
            userLogin,
            postId,
        }
        const currentBlogger = new CommentsModel(currentComment)

        try {
            const result: any = await currentBlogger.save()

            return {
                id: result.id,
                userId: result.userId,
                content: result.content,
                userLogin: result.userLogin,
                createdAt: result.createdAt,
            } as CommentDataType

        } catch (e) {
            return null
        }
    },
    async getCommentsForCurrentPost({
                                        postId,
                                        sortBy,
                                        sortDirection,
                                        pageNumber,
                                        pageSize
                                    }: GetCommentForCurrentPostType) {

        const skipCount = (pageNumber - 1) * pageSize;
        const sortCreateData = sortBy ? sortBy : 'createdAt'
        const sortDirectionData = sortDirection === 'asc' ? 1 : -1

        const totalCount = await CommentsModel.find({postId: postId}).count();
        const pagesCount = Math.ceil(Number(totalCount) / pageSize) || 0;

        try {
            const result: any = await CommentsModel.find({postId: postId}).skip(skipCount)
                .limit(pageSize)
                .sort({[sortCreateData]: sortDirectionData})

            console.log(result, 'result')
            if (result.length) {
                const items = result.reduce((acc: CommentDataType[], item: DbCommentsType) => {
                    const newComment: CommentDataType = {
                        id: item.id,
                        userId: item.userId,
                        content: item.content,
                        userLogin: item.userLogin,
                        createdAt: item.createdAt
                    }
                    acc.push(newComment)
                    return acc
                }, [])

                return {
                    pagesCount,
                    page: Number(pageNumber),
                    pageSize: Number(pageSize),
                    totalCount: Number(totalCount),
                    items,

                }
            } else {
                return null
            }


        } catch (e) {
            return null;
        }

    },

    async getCurrentComment(commentId: string) {

        try {
            const result:any = await CommentsModel.find({id: commentId});
            if (result.length) {
                return {
                    id: result[0].id,
                    userId: result[0].userId,
                    content: result[0].content,
                    userLogin: result[0].userLogin,
                    createdAt: result[0].createdAt
                }
            } else {
                return null
            }
        } catch (e) {
            return null
        }

    },
    async updateCurrentComment(commentId:string,content: string) {
        try {
            return  CommentsModel.updateOne({id: commentId}, {
                $set: {
                    content: content,
                }
            })

        }catch (e) {
            return null
        }

    },

    async deleteCurrentComment(commentId:string) {
        try {
            return  CommentsModel.deleteOne({id: commentId})
        }catch (e) {
            return null
        }

    }

}