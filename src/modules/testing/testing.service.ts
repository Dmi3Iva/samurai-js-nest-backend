import { Injectable } from '@nestjs/common';
import { UserExportRepository } from '../user-accounts/users/infrastructure/user-export.repository.js';

@Injectable()
export class TestingService {
  constructor(private userExportRepository: UserExportRepository) {}

  async removeAll() {
    await this.userExportRepository.removeAll();
  }
}
