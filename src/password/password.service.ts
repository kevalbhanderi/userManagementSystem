import { Body, Injectable, Req } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as nodemailer from 'nodemailer';
import { Request } from 'express';
import { ChangePasswordDto } from 'src/password/dto/changePassword.dto';
import { client } from 'src/database/database.module';
import { resMessage } from 'src/user-auth/helper/resMessage';

@Injectable()
export class PasswordService {
  /**
   *
   * @param password oldPassword and NewPassword
   * @returns Password Status
   */
  async changePassword(password: ChangePasswordDto, @Req() req: Request) {
    const oldPassword = password.oldpassword;
    const newPassword = password.newpassword;

    const bearerHeader = req.headers.authorization.replace('Bearer ', '');
    const jwtData = jwt.verify(bearerHeader, process.env.ACCESS_TOKEN);

    const checkOldPassword = await client.query(
      `SELECT password FROM userdata WHERE email='${jwtData['email']}'`,
    );

    if (oldPassword === checkOldPassword.rows[0]['password']) {
      const updatePassword = await client.query(
        `UPDATE userdata SET password='${newPassword}' WHERE email='${jwtData['email']}'`,
      );
      return { message: resMessage.messages.passwordUpdated };
    } else {
      return { message: resMessage.messages.oldPassword };
    }
  }

  async forgotPassword(password: ChangePasswordDto, @Req() req: Request) {
    const email = req.body.email;
    if (email) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
          user: 'kaivalbhanderi305@gmail.com',
          pass: process.env.MAIL_PASS,
        },
        secure: true,
        tls: {
          rejectUnauthorized: false,
        },
      });

      const mailOptions = {
        from: 'kaivalbhanderi305@gmail.com',
        to: req.body.email,
        subject: 'Change Password',
        html: '<h1>Change Password</h1> <a href="http://127.0.0.1:5000/api/forgotpassword">Clieck here</a>',
      };
      transporter.sendMail(mailOptions, (err, result) => {
        if (err) {
          throw err;
        }
        return { message: 'Mail Sent' };
      });
    } else {
      return { message: 'Invalid Email' };
    }
  }

  async setPassword(@Body() password: ChangePasswordDto, @Req() req: Request) {
    const newPassword = req.body.newpassword;

    const bearerHeader = req.headers.authorization.replace('Bearer ', '');
    const jwtData = jwt.verify(bearerHeader, process.env.ACCESS_TOKEN);

    const updateForgetPassword = client.query(
      `UPDATE userdata SET password='${newPassword}' WHERE email='${jwtData['email']}'`,
    );
    return { message: 'Password Updated Successfully' };
  }
}
