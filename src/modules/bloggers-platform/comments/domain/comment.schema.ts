import { UserDocument } from '#src/modules/user-accounts/users/domain/user.schema.js';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model, Types } from 'mongoose';
import { CommentViewDTO } from '../dto/comment-view.dto.js';
import { ELikeStatus } from '../types/like-status.enum.js';

@Schema({ timestamps: true })
export class Comment {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;

  @Prop({ required: true, type: String, maxLength: 5000, minLength: 1 })
  content: string;

  @Prop({ required: true, type: String })
  userId: string;

  mapToView(user: UserDocument): CommentViewDTO {
    return {
      id: this._id.toString(),
      content: this.content,
      commentatorInfo: {
        userId: user.id,
        userLogin: user.login,
      },
      createdAt: this.createdAt,
      likesInfo: {
        likesCount: 0,
        dislikesCount: 0,
      },
      myStatus: ELikeStatus.None,
    };
  }
}

export const CommentSchema = SchemaFactory.createForClass(Comment);

CommentSchema.loadClass(Comment);

export type CommentDocument = HydratedDocument<Comment>;

export type CommentModelType = Model<CommentDocument> & typeof Comment;
