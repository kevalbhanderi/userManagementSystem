import { Body, Controller, Post } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserAuthService } from './userAuth.service';

@Controller('api')
export class UserAuthController {
  constructor(private readonly userAuthsService: UserAuthService) {}

  @Post('signup')
  async signup(@Body() user: UserDto) {
    const signupData = await this.userAuthsService.signup(user);
    return signupData;
  }

  @Post('login')
  async login(@Body() user: UserDto) {
    const loginData = await this.userAuthsService.login(user);
    return loginData;
  }
}
