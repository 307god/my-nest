import { HttpService, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable, of } from 'rxjs';
import { map, timeout } from 'rxjs/operators';
import { WxConstants } from './constants';

@Injectable()
export class WxService {
  constructor(
    private readonly httpService: HttpService,
    private readonly jwtService: JwtService,
  ) {}

  async login(code: string): Promise<WX.result> {
    const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${WxConstants.appid}&secret=${WxConstants.secret}&js_code=${code}&grant_type=authorization_code`;
    const res = await this.httpService.get(url).toPromise();

    const { openid, session_key, errcode, errmsg } = res.data;

    let data: WX.result;

    if (openid) {
      data = {
        code: 1,
        msg: '用户登录成功',
        access_token: this.jwtService.sign({ openid: openid }),
      };
    } else {
      data = {
        code: -1,
        msg: 'openid获取失败',
      };
    }

    return data;
  }
}
