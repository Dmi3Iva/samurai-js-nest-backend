import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDTO } from '../dto/create-user.dto.js';
import { UsersService } from '../application/users.service.js';
import { UserViewDTO } from '../dto/user-view.dto.js';
import { QueryUsersDTO } from '../dto/query-users.dto.js';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('/')
  async findAll(@Query() q: QueryUsersDTO) {
    return await this.userService.getAllUsers(q);
  }

  @Get('/:id')
  async getById(@Param('id') userId: string): Promise<UserViewDTO> {
    const user = await this.userService.getUserById(userId);

    if (!user) {
      throw new NotFoundException('user with specified id not found');
    }

    return user;
  }

  @HttpCode(201)
  @Post('/')
  async createUser(@Body() createUserDTO: CreateUserDTO): Promise<UserViewDTO> {
    return await this.userService.createUser(createUserDTO);
  }

  @HttpCode(204)
  @Delete('/:id')
  async removeUser(@Param('id') userId: string): Promise<void> {
    const isUserFound = await this.userService.removeUser(userId);
    if (!isUserFound) {
      throw new NotFoundException('User with specified id not found');
    }
  }
}
