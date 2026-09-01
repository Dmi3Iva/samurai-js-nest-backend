import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommentDocument, Comment } from '../domain/comment.schema.js';

@Injectable()
export class CommentsRepository {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
  ) {}

  async findCommentById(userId: string): Promise<CommentDocument | null> {
    return await this.commentModel.findById(userId);
  }
}
