import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { encryptPassword } from 'src/utils/cryptogram';
import { User } from 'src/users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne({ account_name: username });
    if (user) {
      const hashedPassword = user.passwd;
      const salt = user.passwd_salt;

      const hashPassword = encryptPassword(password, salt);

      if (hashedPassword === hashPassword) {
        // 密码正确
        return {
          code: 1,
          user,
        };
      } else {
        // 密码错误
        return {
          code: 2,
          user: null,
        };
      }
    }
    // 查无此人
    return {
      code: 3,
      user: null,
    };
  }

  async certificate(user: Partial<User>): Promise<any> {
    const payload = {
      username: user.account_name,
      sub: user.user_id,
      realName: user.real_name,
      role: user.role,
    };

    try {
      const access_token = this.jwtService.sign(payload);
      return {
        code: 200,
        data: {
          access_token,
        },
        msg: `登录成功`,
      };
    } catch (error) {
      return {
        code: 600,
        msg: `账号或密码错误`,
      };
    }
  }
}
