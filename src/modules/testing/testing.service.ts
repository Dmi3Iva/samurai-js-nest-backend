import { Injectable } from '@nestjs/common';
import { UserExportRepository } from '../user-accounts/users/infrastructure/user-export.repository.js';
import { CommentsExportRepository } from '../bloggers-platform/comments/infrastructure/comments-export.repository.js';

@Injectable()
export class TestingService {
  constructor(
    private userExportRepository: UserExportRepository,
    private commentsExportRepository: CommentsExportRepository,
  ) {}

  async removeAll() {
    await this.userExportRepository.removeAll();
    await this.commentsExportRepository.removeAll();
  }
}
