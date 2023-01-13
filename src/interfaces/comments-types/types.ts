export enum LikeStatus {
    None = 'None',
    Like = 'Like',
    Dislike = 'Dislike'
}

export enum NameFiledCount {
    likesCount = 'likesCount',
    dislikesCount = 'dislikesCount',
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
    nameFieldCount: NameFiledCount
    count: number,
    commentId: string,
}

