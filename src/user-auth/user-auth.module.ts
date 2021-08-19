import { Module } from '@nestjs/common';
import { UserAuthController } from './user-auth.controller';
import { UserAuthService } from './user-auth.service';

@Module({
  controllers: [UserAuthController],
  providers: [UserAuthService],
})
export class UserAuthModule {}
