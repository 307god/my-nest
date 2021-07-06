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

  async getAccessToken() {
    const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${WxConstants.appid}&secret=${WxConstants.secret}`;
    const res = await this.httpService.get(url).toPromise();

    const { access_token, expires_in, errcode, errmsg } = res.data;

    let data;

    if (access_token) {
      data = {
        code: 1,
        msg: '获取token成功',
        access_token,
        expires_in,
      };
    } else {
      data = {
        code: -1,
        msg: '获取token失败',
        errcode,
        errmsg,
      };
    }

    return data;
  }

  async subscribeMessageSend(token: string) {
    const url = `https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=${token}`;
    const res = await this.httpService
      .post(url, {
        touser: 'oyWVo5Py3GmL2KfRrJM50-Yftch0',
        template_id: '5Ux6W2fRh1RpUeL-PzAsqp2rCM69s59Wumwm5btF6ko',
        data: {
          thing1: { value: '胡' },
          thing2: { value: '映' },
          number3: { value: '123' },
          time4: { value: '2018-01-01' },
        },
      })
      .toPromise();

    const { errcode, errmsg } = res.data;

    const data = {
      code: 1,
      msg: '订阅消息推送成功',
      errcode,
      errmsg,
    };

    console.log(data);

    return data;
  }
}
