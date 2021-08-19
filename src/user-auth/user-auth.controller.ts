import { Body, Controller, Post, Req } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserAuthService } from './user-auth.service';

@Controller('api')
export class UserAuthController {
  constructor(private readonly userAuthsService: UserAuthService) {}

  @Post('signup')
  async signup(@Body() user: UserDto) {
    return await this.userAuthsService.signup(user);
  }

  @Post('login')
  async login(@Body() user: UserDto) {
    return await this.userAuthsService.login(user);
  }
}
