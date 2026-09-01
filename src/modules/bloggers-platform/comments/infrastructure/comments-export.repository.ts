import { InjectModel } from '@nestjs/mongoose';
import { Comment } from '../domain/comment.schema.js';
import type { CommentModelType } from '../domain/comment.schema.js';

export class CommentsExportRepository {
  constructor(
    @InjectModel(Comment.name) private commentModel: CommentModelType,
  ) {}

  async removeAll() {
    await this.commentModel.deleteMany({});
  }
}
