import { Module } from '@nestjs/common';
import { CommentsController } from './comments/api/comments.controller.js';
import { CommentsService } from './comments/application/comments.service.js';
import { CommentsRepository } from './comments/infrastructure/comments.repository.js';
import { UserAccountsModule } from '../user-accounts/user-accounts.module.js';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentSchema, Comment } from './comments/domain/comment.schema.js';
import { CommentsExportRepository } from './comments/infrastructure/comments-export.repository.js';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
    UserAccountsModule,
  ],
  controllers: [CommentsController],
  providers: [CommentsService, CommentsRepository, CommentsExportRepository],
  exports: [CommentsExportRepository],
})
export class BloggersPlatformModule {}
