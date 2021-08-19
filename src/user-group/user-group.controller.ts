import { Controller, Post, Req } from '@nestjs/common';
import { CreateGroupDto } from './dto/createGroup.dto';
import { Request } from 'express';
import { UserGroupService } from './user-group.service';

@Controller('api')
export class UserGroupController {
  constructor(private userGroupService: UserGroupService) {}

  @Post('create-group')
  async createGroup(group: CreateGroupDto, @Req() req: Request) {
    return await this.userGroupService.createGroup(group, req);
  }
}
