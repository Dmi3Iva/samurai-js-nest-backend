import { Module } from '@nestjs/common';
import { CommentsController } from './comments/api/comments.controller.js';
import { CommentsService } from './comments/application/comments.service.js';
import { CommentsRepository } from './comments/infrastructure/comments.repository.js';
import { UserAccountsModule } from '../user-accounts/user-accounts.module.js';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentSchema, Comment } from './comments/domain/comment.schema.js';
import { CommentsExportRepository } from './comments/infrastructure/comments-export.repository.js';
import { Post, PostSchema } from './posts/domain/posts.entity.js';
import { PostsController } from './posts/api/posts.controller.js';
import { PostsService } from './posts/application/posts.service.js';
import { PostsRepository } from './posts/infrastructure/posts.repository.js';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    UserAccountsModule,
  ],
  controllers: [CommentsController, PostsController],
  providers: [
    CommentsService,
    CommentsRepository,
    CommentsExportRepository,
    PostsService,
    PostsRepository,
  ],
  exports: [CommentsExportRepository],
})
export class BloggersPlatformModule {}
