import { InjectModel } from '@nestjs/mongoose';
import { User } from '../domain/user.schema.js';
import type { UserModelType } from '../domain/user.schema.js';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserExportRepository {
  constructor(@InjectModel(User.name) private userModel: UserModelType) {}

  async removeAll() {
    await this.userModel.deleteMany({});
  }
}
