import { Controller, Post, Put, Req } from '@nestjs/common';
import { Request } from 'express';
import { UserGroupService } from './user-group.service';

@Controller('api')
export class UserGroupController {
  constructor(private userGroupService: UserGroupService) {}

  @Post('create-group')
  async createGroup(@Req() req: Request) {
    return await this.userGroupService.createGroup(req);
  }

  @Post('add-members')
  async addMembers(@Req() req: Request) {
    return await this.userGroupService.addMember(req);
  }

  @Put('make-admin')
  async makeAdmin(@Req() req: Request) {
    return await this.userGroupService.makeAdmin(req);
  }
}
