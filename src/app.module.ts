import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserAuthModule } from './userAuth/userAuth.module';
import { PasswordModule } from './password/password.module';
import { UserGroupModule } from './user-group/user-group.module';

@Module({
  imports: [UserAuthModule, PasswordModule, UserGroupModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
