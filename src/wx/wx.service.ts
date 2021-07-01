import { HttpService, Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { map, timeout } from 'rxjs/operators';
import { WxConstants } from './constants';

@Injectable()
export class WxService {
  constructor(private readonly httpService: HttpService) {}

  async login(code: string) {
    const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${WxConstants.appid}&secret=${WxConstants.secret}&js_code=${code}&grant_type=authorization_code`;
    const { data } = await this.httpService.get(url).toPromise();

    const { openid, session_key } = data;

    return { openid };
  }
}
