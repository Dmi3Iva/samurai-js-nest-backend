import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from '../domain/posts.entity.js';
import { PostsRepository } from '../infrastructure/posts.repository.js';
import { CreatePostDTO } from '../dto/create-post.dto.js';
import { CommentsRepository } from '../../comments/infrastructure/comments.repository.js';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<Post>,
    private postsRepository: PostsRepository,
    private commentsRepository: CommentsRepository,
  ) {}

  async getPostById(id: string) {
    return await this.postsRepository.findPostById(id);
  }

  async getCommentById(id: string) {
    return await this.commentsRepository.findCommentById(id);
  }

  async getAllPosts() {
    const posts = await this.postsRepository.findAllPosts();

    // return
    // Promise.all(
    return posts.map((p) => {
      const blogName = 'todo';
      return p.mapToView(blogName);
    });
    // );
  }

  async createPost(createPostDTO: CreatePostDTO) {
    const post = await this.postModel.create(createPostDTO);

    await this.postsRepository.save(post);

    // TODO:: fetchBlogNameById
    const blogName = 'todoBlogName';

    return post.mapToView(blogName);
  }

  async deleteById(id: string) {
    await this.postModel.findByIdAndDelete(id);
  }
}
