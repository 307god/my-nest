import {
  Body,
  Controller,
  Request,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { ValidationPipe } from 'src/common/pipe/validation.pipe';
import { RegisterInfoDTO } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req): Promise<any> {
    const authResult = req.user;
    switch (authResult.code) {
      case 1:
        return this.authService.certificate(authResult.user);
      case 2:
        return {
          code: 600,
          msg: `账号或密码不正确`,
        };
      default:
        return {
          code: 600,
          msg: `查无此人`,
        };
    }
  }

  @UsePipes(new ValidationPipe())
  @Post('register')
  async register(@Body() body: RegisterInfoDTO): Promise<any> {
    return await this.usersService.register(body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('profile')
  async getProfile(@Request() req) {
    return req.user;
  }
}
