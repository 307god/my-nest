import { Controller, Get, Query } from '@nestjs/common';
import { WxService } from './wx.service';

@Controller('wx')
export class WxController {
  constructor(private readonly wxService: WxService) {}

  @Get()
  async get(@Query('code') code): Promise<any> {
    return this.wxService.login(code);
  }
}
