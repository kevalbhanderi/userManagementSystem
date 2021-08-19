import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserAuthModule } from './userAuth/userAuth.module';
import { PasswordModule } from './password/password.module';

@Module({
  imports: [UserAuthModule, PasswordModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
