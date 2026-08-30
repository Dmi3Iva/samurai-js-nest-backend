import { Module } from '@nestjs/common';
import { UsersController } from './modules/user-accounts/users/api/users.controller.js';
import { MongooseModule } from '@nestjs/mongoose';
import {
  User,
  UserSchema,
} from './modules/user-accounts/users/domain/user.schema.js';
import { UsersService } from './modules/user-accounts/users/application/users.service.js';
import { UserRepository } from './modules/user-accounts/users/infrastructure/user.repository.js';
import { BloggersPlatformModule } from './modules/bloggers-platform/bloggers-platform.module.js';
import { UserAccountsModule } from './modules/user-accounts/user-accounts.module.js';
import { ControllerModule } from './core/core.module.js';
import { TestingModule } from './testing/testings.module.js';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    BloggersPlatformModule,
    UserAccountsModule,
    ControllerModule,
    TestingModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, UserRepository],
})
export class AppModule {}
