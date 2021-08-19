import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class GroupMemberDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  member_id: string;

  @IsString()
  @IsNotEmpty()
  group_id: string;

  @IsString()
  @IsBoolean()
  @IsNotEmpty()
  is_admin: boolean;

  @IsString()
  @IsBoolean()
  @IsNotEmpty()
  is_super_admin: boolean;
}
