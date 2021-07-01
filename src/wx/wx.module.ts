import { HttpModule, Module } from '@nestjs/common';
import { WxService } from './wx.service';
import { WxController } from './wx.controller';

@Module({
  imports: [HttpModule],
  providers: [WxService],
  controllers: [WxController],
})
export class WxModule {}
