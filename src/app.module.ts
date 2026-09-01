import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BloggersPlatformModule } from './modules/bloggers-platform/bloggers-platform.module.js';
import { UserAccountsModule } from './modules/user-accounts/user-accounts.module.js';
import { ControllerModule } from './core/core.module.js';
import { TestingModule } from './modules/testing/testing.module.js';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'),
    BloggersPlatformModule,
    UserAccountsModule,
    ControllerModule,
    TestingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
