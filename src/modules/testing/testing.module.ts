import { Module } from '@nestjs/common';
import { TestingController } from './testing.controller.js';
import { TestingService } from './testing.service.js';
import { UserAccountsModule } from '../user-accounts/user-accounts.module.js';
import { BloggersPlatformModule } from '../bloggers-platform/bloggers-platform.module.js';

@Module({
  imports: [UserAccountsModule, BloggersPlatformModule],
  controllers: [TestingController],
  providers: [TestingService],
})
export class TestingModule {}
