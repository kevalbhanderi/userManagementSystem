import { Injectable, Req } from '@nestjs/common';
import { Request } from 'express';
import { client } from 'src/database/database.module';
import { v4 as uuidv4 } from 'uuid';
import { CreateGroupDto } from './dto/createGroup.dto';

@Injectable()
export class UserGroupService {
  async createGroup(group: CreateGroupDto, @Req() req: Request) {
    const groupName = req.body.groupname;

    const groupDetails = await client.query(
      `INSERT INTO group_info (group_id, group_name) VALUES ('${uuidv4()}', '${groupName}')`,
    );

    const groupid = await client.query(
      `SELECT group_id FROM group_info WHERE group_name='${groupName}'`,
    );

    const groupAdminDetails = await client.query(
      `INSERT INTO group_member (id, member_id, is_admin, is_super_admin) VALUES ('${uuidv4()}', '${uuidv4()}', true, true)`,
    );

    return { message: 'Group Created' };
  }
}
