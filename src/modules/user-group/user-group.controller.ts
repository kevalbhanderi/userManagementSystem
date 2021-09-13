import { Controller, Delete, Post, Put, Req } from '@nestjs/common';
import { Request } from 'express';
import { CreateGroupDto } from './dto/createGroup.dto';
import { UserGroupService } from './user-group.service';

@Controller('api')
export class UserGroupController {
  constructor(private userGroupService: UserGroupService) {}

  @Post('create-group')
  async createGroup(createGroup: CreateGroupDto, @Req() req: Request) {
    return await this.userGroupService.createGroup(createGroup, req);
  }

  @Post('add-members')
  async addMembers(@Req() req: Request) {
    return await this.userGroupService.addMember(req);
  }

  @Put('make-admin')
  async makeAdmin(@Req() req: Request) {
    return await this.userGroupService.makeAdmin(req);
  }

  @Delete('remove-member')
  async removeMember(@Req() req: Request) {
    return await this.userGroupService.removeMember(req);
  }
}
