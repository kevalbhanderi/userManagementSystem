import { Module } from '@nestjs/common';
import { PasswordService } from './password.service';
import { PasswordController } from './password.controller';

@Module({
  providers: [PasswordService],
  controllers: [PasswordController],
})
export class PasswordModule {}
