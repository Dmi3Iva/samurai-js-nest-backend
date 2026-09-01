import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from '../domain/posts.entity.js';
import { Model } from 'mongoose';

@Injectable()
export class PostsRepository {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  async findPostById(id: string): Promise<PostDocument | null> {
    return await this.postModel.findById(id);
  }

  async findAllPosts() {
    return await this.postModel.find();
  }

  async save(post: PostDocument) {
    await post.save();
  }
}
