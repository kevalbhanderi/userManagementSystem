import { Body, Controller, Post, Req } from '@nestjs/common';
import { ChangePasswordDto } from 'src/password/dto/changePassword.dto';
import { Request } from 'express';
import { PasswordService } from './password.service';

@Controller('api')
export class PasswordController {
  constructor(private readonly passwordService: PasswordService) {}

  @Post('changepassword')
  async changePassword(
    @Body() password: ChangePasswordDto,
    @Req() req: Request,
  ) {
    return await this.passwordService.changePassword(password, req);
  }

  @Post('sendmail')
  async forgotPassword(@Req() req: Request) {
    return await this.passwordService.forgotPassword(req);
  }

  @Post('forgotpassword')
  async setPassword(@Body() password: ChangePasswordDto, @Req() req: Request) {
    return await this.passwordService.setPassword(password, req);
  }
}
