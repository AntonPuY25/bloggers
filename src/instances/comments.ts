import {LikeInfoType} from "../interfaces/comments-types/types";

export class Comments {
    constructor(public id: string,
                public content: string,
                public userId: string,
                public userLogin: string,
                public likesInfo:LikeInfoType,
                public postId?: string,

    ) {
    }
}

export class CommentsFromBd extends Comments {
    constructor(id: string,
                content: string,
                userId: string,
                userLogin: string,
                public createdAt: string,
                likesInfo:LikeInfoType,

    ) {
        super(id,content,userId,userLogin,likesInfo);
    }
}

