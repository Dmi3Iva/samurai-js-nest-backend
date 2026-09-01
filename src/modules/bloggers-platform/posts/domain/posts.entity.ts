import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PostViewDTO } from '../dto/post-view.dto.js';
import { ELikeStatus } from '../../comments/types/like-status.enum.js';
import { HydratedDocument, Model } from 'mongoose';
import { CreatePostDTO } from '../dto/create-post.dto.js';

@Schema({ timestamps: true })
export class Post {
  createdAt: Date;
  updatedAt: Date;
  id: string;

  @Prop({ type: String })
  title: string;

  @Prop({ type: String })
  content: string;

  @Prop({ type: String })
  shortDescription: string;

  @Prop({ type: String })
  blogId: string;

  // static createInstance(createPostDTO: CreatePostDTO): PostDocument {
  //   const p = ;

  //   p.title = createPostDTO.title;
  //   p.content = createPostDTO.content;
  //   p.shortDescription = createPostDTO.shortDescription;
  //   p.blogId = createPostDTO.blogId;

  //   return p;
  // }

  mapToView(blogName: string): PostViewDTO {
    return {
      id: this.id,
      title: this.title,
      shortDescription: this.shortDescription,
      content: this.content,
      blogId: this.blogId,
      blogName,
      createdAt: this.createdAt,
      extendedLikesInfo: {
        likesCount: 0,
        dislikesCount: 0,
        myStatus: ELikeStatus.None,
        newestLikes: [],
      },
    };
  }
}

export const PostSchema = SchemaFactory.createForClass(Post);

PostSchema.loadClass(Post);

export type PostDocument = HydratedDocument<Post>;

export type PostModelType = Model<PostDocument> & typeof Post;
