import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Body,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { WxService } from './wx.service';

@Controller('wx')
export class WxController {
  constructor(private readonly wxService: WxService) {}

  @Post('login')
  async get(@Body('code') code): Promise<any> {
    return this.wxService.login(code);
  }

  @UseGuards(AuthGuard('wx-jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  //test
  @Get('')
  test() {
    this.wxService.getAccessToken().then((data) => {
      if (data.code === 1) {
        return this.wxService.subscribeMessageSend(data.access_token);
      }
      return;
    });
  }
}
