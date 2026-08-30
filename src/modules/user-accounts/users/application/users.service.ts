import { CreateUserDTO } from '../dto/create-user.dto.js';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../domain/user.schema.js';
import { UserRepository } from '../infrastructure/user.repository.js';
import { UserViewDTO } from '../dto/user-view.dto.js';
import { QueryUsersDTO } from '../dto/query-users.dto.js';
import { QueryUsersResultViewDTO } from '../dto/query-users-view.dto.js';
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator.js';
// import {  } from '@nestjs/comon';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<User>,
    private userRepository: UserRepository,
  ) {}

  async getAllUsers(queryDTO: QueryUsersDTO): Promise<QueryUsersResultViewDTO> {
    const query = queryDTO.mapToRepositoryQuery();
    const rawResult = await this.userRepository.findAllUsers(query);

    const result: QueryUsersResultViewDTO = {
      page: rawResult.page,
      pageSize: rawResult.pageSize,
      pagesCount: rawResult.pagesCount,
      totalCount: rawResult.totalCount,
      items: rawResult?.items?.map((u) => u.mapToView()),
    };

    return result;
  }

  async createUser(createUserDTO: CreateUserDTO): Promise<UserViewDTO> {
    const user = new this.UserModel(createUserDTO);

    await this.userRepository.saveUser(user);

    return UserViewDTO.mapDocToView(user);
  }

  async getUserById(userId: string) {
    return await this.userRepository.findUserById(userId);
  }

  async removeUser(userId: string) {
    const user = await this.userRepository.findUserById(userId);

    if (!user) return false;

    await this.userRepository.removeUser(user);

    return true;
  }
}
