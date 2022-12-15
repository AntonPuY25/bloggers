class Comments {
    constructor(public id: string,
                public content: string,
                public userId: string,
                public userLogin: string,
                public postId: string
    ) {
    }
}

class CommentsFromBd extends Comments {
    constructor(id: string,
                content: string,
                userId: string,
                userLogin: string,
                public createdAt: string,
    ) {
        super(id,content,userId,userLogin,'1');
    }
}

