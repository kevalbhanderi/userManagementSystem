import { Injectable, Req } from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { client } from 'src/database/database.module';
import { v4 as uuidv4 } from 'uuid';
import { CreateGroupDto } from './dto/createGroup.dto';
import { GroupMemberDto } from './dto/groupMember.dto';

@Injectable()
export class UserGroupService {
  async createGroup(@Req() req: Request) {
    const groupName = req.body.groupname;

    try {
      const groupDetails = await client.query(
        `INSERT INTO group_info (group_id, group_name) VALUES ('${uuidv4()}', '${groupName}')`,
      );
    } catch {
      return { message: 'GroupName Already Exists' };
    }

    const groupid = await client.query(
      `SELECT group_id FROM group_info WHERE group_name='${groupName}'`,
    );

    const bearerHeader = req.headers.authorization.replace('Bearer ', '');
    const jwtData = jwt.verify(bearerHeader, process.env.ACCESS_TOKEN);

    const user_id = await client.query(
      `SELECT id FROM userdata WHERE email='${jwtData['email']}'`,
    );

    const groupAdminDetails = await client.query(
      `INSERT INTO group_member (id, member_id, group_id, is_admin, is_super_admin) VALUES ('${uuidv4()}', '${
        user_id.rows[0]['id']
      }', '${groupid.rows[0]['group_id']}', true, true)`,
    );
    return { message: 'Group Created' };
  }

  async addMember(@Req() req: Request) {
    const groupMember = req.body.member;
    const groupName = req.body.groupname;
    const groupMemberAdmin = req.body.isadmin;

    const groupid = await client.query(
      `SELECT group_id FROM group_info WHERE group_name='${groupName}'`,
    );

    const groupMemberDetails = await client.query(
      `INSERT INTO group_member (id, member_id, group_id, is_admin, is_super_admin) VALUES ('${uuidv4()}', '${groupMember}', '${
        groupid.rows[0]['group_id']
      }', '${groupMemberAdmin}', false)`,
    );
    return { message: 'Member Added' };
  }

  async makeAdmin(@Req() req: Request) {
    const groupMember = req.body.member;
    const groupMemberAdmin = req.body.isadmin;

    const makeAdmin = await client.query(
      `UPDATE group_member SET is_admin='${groupMemberAdmin}' WHERE member_id='${groupMember}'`,
    );
    return { message: 'Admin Added' };
  }
}
