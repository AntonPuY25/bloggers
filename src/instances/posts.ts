export class Post {
    constructor(public id: string,
                public title: string,
                public shortDescription: string,
                public content: string,
                public blogId: string,
    ) {
    }
}

export class PostFromBd extends Post {
    constructor(id: string,
                title: string,
                shortDescription: string,
                content: string,
                blogId: string,
                public createdAt: string,
                public blogName: string,
                ) {

        super(id, title, shortDescription, content, blogId);

    }
}
