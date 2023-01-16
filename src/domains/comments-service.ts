import {CommentsRepository} from "../Repositories/comments-repository";
import {LikeStatus, UpdateLikeStatusForCurrentComment} from "../interfaces/comments-types/types";

export class CommentsService {
    constructor(protected commentsRepository: CommentsRepository) {
    }

    async updateLikeStatusForCurrentComment({likeStatus, commentId, currentStatus}: UpdateLikeStatusForCurrentComment) {
        let countForLikeField = 0;
        let countForDisLikeField = 0;
        let likeStatusValue = likeStatus;

        switch (currentStatus) {
            case LikeStatus.None:
                if (likeStatus === LikeStatus.Like) {
                    countForLikeField = 1
                    break;
                } else if (likeStatus === LikeStatus.Dislike) {
                    countForDisLikeField = 1;
                    break
                }
                break;
            case LikeStatus.Like: {
                if (likeStatus === LikeStatus.Like) {
                    countForLikeField = -1
                    likeStatusValue = LikeStatus.None
                    break
                }
                if (likeStatus === LikeStatus.Dislike) {
                    countForLikeField = -1
                    countForDisLikeField = 1
                    break
                }
                break
            }
            default: {
                if (likeStatus === LikeStatus.Like) {
                    countForLikeField = 1
                    countForDisLikeField = -1
                }
                if (likeStatus === LikeStatus.Dislike) {
                    countForDisLikeField = -1
                    likeStatusValue = LikeStatus.None
                }
            }
        }

        return await this.commentsRepository.updateLikeStatusForCurrentComment({
            likeStatus: likeStatusValue,
            commentId,
            countForLikeField,
            countForDisLikeField,
        })
    }
}