import {CommentsRepository} from "../Repositories/comments-repository";
import {NameFiledCount, UpdateLikeStatusForCurrentComment} from "../interfaces/comments-types/types";

export class CommentsService {
    constructor(protected commentsRepository: CommentsRepository) {
    }

    async updateLikeStatusForCurrentComment({likeStatus, commentId, currentStatus}: UpdateLikeStatusForCurrentComment) {
        let nameFieldCount = NameFiledCount.likesCount;

        return await this.commentsRepository.updateLikeStatusForCurrentComment({
            likeStatus,
            commentId,
            nameFieldCount,
            count: 3
        })
    }
}