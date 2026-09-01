import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../domain/user.schema.js';
import type { UserModelType } from '../domain/user.schema.js';
import { IFindUserQuery } from './find-user.query.js';
import { ESortDirection } from '#src/core/enums/sort-direction.enum.js';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: UserModelType) {}

  async saveUser(user: UserDocument) {
    await user.save();
  }

  async removeUser(user: UserDocument) {
    await user.deleteOne();
  }

  async removeUserById(userId: string) {
    await this.userModel.findByIdAndDelete(userId);
  }

  async findUserById(userId: string): Promise<UserDocument | null> {
    return await this.userModel.findById(userId);
  }

  async findAllUsers(query: IFindUserQuery) {
    const {
      sortBy,
      sortDirection,
      pageNumber,
      pageSize,
      searchLoginTerm: login,
      searchEmailTerm: email,
    } = query;
    const limit = pageSize;
    const skip = (pageNumber - 1) * pageSize;
    const filter = {
      ...(email && login
        ? {
            $or: [
              ...(login ? [{ login: { $regex: login, $options: 'i' } }] : []),
              ...(email ? [{ email: { $regex: email, $options: 'i' } }] : []),
            ],
          }
        : {}),
    };

    const items = await this.userModel
      .find(filter)
      .sort({
        [sortBy]: sortDirection === ESortDirection.Asc ? 1 : -1,
      })
      .skip(skip)
      .limit(limit);

    const totalCount = await this.userModel.countDocuments(filter);
    const page = pageNumber;
    const pagesCount = Math.ceil(totalCount / pageSize);

    return {
      pagesCount,
      page,
      pageSize,
      totalCount,
      items,
    };
  }
}
