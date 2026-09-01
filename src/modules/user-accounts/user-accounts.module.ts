import { Module } from '@nestjs/common';
import { UserExportRepository } from './users/infrastructure/user-export.repository.js';
import { UsersController } from './users/api/users.controller.js';
import { UserRepository } from './users/infrastructure/user.repository.js';
import { UsersService } from './users/application/users.service.js';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './users/domain/user.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UserRepository, UserExportRepository],
  exports: [UserExportRepository],
})
export class UserAccountsModule {}
