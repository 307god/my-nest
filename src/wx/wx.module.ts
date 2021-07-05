import { HttpModule, Module } from '@nestjs/common';
import { WxService } from './wx.service';
import { WxController } from './wx.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    HttpModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '600s' },
    }),
  ],
  providers: [WxService, JwtStrategy],
  controllers: [WxController],
})
export class WxModule {}
