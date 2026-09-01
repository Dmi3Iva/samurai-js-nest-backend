import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { QueryPostCommentsDTO } from '../dto/query-post-comments.dto.js';
import { CreatePostDTO } from '../dto/create-post.dto.js';
import { PostsService } from '../application/posts.service.js';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get('/:id/comments')
  async getCommentById(
    @Param('id') id: string,
    @Query() query: QueryPostCommentsDTO,
  ) {
    const post = await this.postsService.getPostById(id);
    if (!post)
      throw new NotFoundException('Post has not been found with specified id');

    return await this.postsService.getCommentById(id);
  }

  @Get('/')
  async getAllPosts() {
    return this.postsService.getAllPosts();
  }

  @HttpCode(201)
  @Post('/')
  async createPost(@Body() createPostDTO: CreatePostDTO) {
    return this.postsService.createPost(createPostDTO);
  }

  @Get('/:id')
  async getPostById(@Param('id') id: string) {
    const post = await this.postsService.getPostById(id);

    if (!post) throw new NotFoundException('Post with specified id not found');

    return post;
  }

  @HttpCode(204)
  @Put('/:id')
  async updatePostById(
    @Param('id') id: string,
    @Body() updatePostDTO: CreatePostDTO,
  ) {
    const post = await this.postsService.getPostById(id);

    if (!post) throw new NotFoundException('Post with specified id not found');

    return;
  }

  @HttpCode(204)
  @Delete('/:id')
  async deleteById(@Param('id') id: string) {
    const post = await this.postsService.getPostById(id);

    if (!post) throw new NotFoundException('Post with specified id not found');

    await this.postsService.deleteById(id);

    return;
  }
}
