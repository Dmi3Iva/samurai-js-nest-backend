import { ELikeStatus } from '../types/like-status.enum.js';

export class CommentViewDTO {
  id: string;
  content: string;
  commentatorInfo: {
    userId: string;
    userLogin: string;
  };
  createdAt: Date;
  likesInfo: {
    likesCount: number;
    dislikesCount: number;
  };

  myStatus: ELikeStatus;
}
