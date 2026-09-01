import {
  Controller,
  Get,
  HttpCode,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { CommentsService } from '../application/comments.service.js';

@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @HttpCode(200)
  @Get('/:id')
  async getComment(@Param('id') id: string) {
    const comment = await this.commentsService.getCommentById(id);
    if (!comment)
      throw new NotFoundException('comment with specified id not found');

    return comment;
  }
}
