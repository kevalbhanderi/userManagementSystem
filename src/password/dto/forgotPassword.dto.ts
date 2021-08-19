import { IsNotEmpty, IsString } from 'class-validator';

export class forgotPasswordDto {
  @IsString()
  @IsNotEmpty()
  newpassword: string;
}
