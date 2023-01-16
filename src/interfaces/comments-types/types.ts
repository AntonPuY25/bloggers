export enum LikeStatus {
    None = 'None',
    Like = 'Like',
    Dislike = 'Dislike'
}

export interface LikeStatusResponseType {
    likeStatus: LikeStatus
}

export interface LikeInfoType {
    likesCount: number,
    dislikesCount: number,
    myStatus: LikeStatus
}

export interface UpdateLikeStatusForCurrentComment {
    likeStatus: LikeStatus
    commentId: string,
    currentStatus: LikeStatus,
}

export interface LikeStatusResponseTypeToBd {
    likeStatus: LikeStatus
    countForLikeField: number,
    countForDisLikeField: number,
    commentId: string,
}

