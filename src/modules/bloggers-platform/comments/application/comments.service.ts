import { Injectable } from '@nestjs/common';
import { CommentViewDTO } from '../dto/comment-view.dto.js';
import { CommentsRepository } from '../infrastructure/comments.repository.js';
import { UserExportRepository } from '#src/modules/user-accounts/users/infrastructure/user-export.repository.js';

@Injectable()
export class CommentsService {
  constructor(
    private commentsRepository: CommentsRepository,
    private userExportRepository: UserExportRepository,
  ) {}

  async getCommentById(userId: string): Promise<null | CommentViewDTO> {
    const comment = await this.commentsRepository.findCommentById(userId);
    if (!comment) return null;

    const user = await this.userExportRepository.findUserById(userId);
    if (!user) return null;

    return comment?.mapToView(user) ?? null;
  }
}
