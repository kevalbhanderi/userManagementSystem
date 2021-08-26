import { BadRequestException, Body, Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { resMessage } from './helper/resMessage';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { client } from 'src/database/database.module';

@Injectable()
export class UserAuthService {
  /**
   *
   * @param user user Credentials
   * @returns
   */
  async signup(user: UserDto) {
    if (user.email && user.username && user.password) {
      const dbUser = await client.query(
        `SELECT email FROM userdata WHERE email='${user.email}'`,
      );
      if (dbUser.rows.length === 0) {
        const newUser = await client.query(
          `INSERT INTO userdata (id, username, email, password) VALUES ('${uuidv4()}', '${
            user.username
          }', '${user.email}', '${user.password}')`,
        );
        return { message: resMessage.messages.Signup };
      } else {
        return { message: resMessage.messages.UserExists };
      }
    } else {
      return { message: resMessage.messages.EmptySignupData };
    }
  }

  /**
   *
   * @param user user Credentials
   * @returns userToken
   */
  async login(@Body() user: UserDto) {
    if (user.email && user.password) {
      const dbPassword = await client.query(
        `SELECT password FROM userdata WHERE email='${user.email}'`,
      );
      const userCredentials = await client.query(
        `SELECT email FROM userdata WHERE email='${user.email}'`,
      );
      if (userCredentials.rows.length != 0) {
        if (user.password === dbPassword.rows[0].password) {
          const email = { email: user.email };
          const userToken = await this.generateAccessToken(email);
          return { Token: userToken };
        } else {
          throw new BadRequestException(
            'Your login information was incorrect. Please check and try again.',
          );
        }
      } else {
        return { message: resMessage.messages.UserNotExists };
      }
    } else {
      return { message: resMessage.messages.EmptyLoginData };
    }
  }

  /**
   *
   * @param user registered user
   * @returns AccessToken
   */
  async generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN, { expiresIn: '24h' });
  }

  /**
   *
   * @param password password
   * @returns hash Password
   */
  async hashPassword(password) {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }
}
