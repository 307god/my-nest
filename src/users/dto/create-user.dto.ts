import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateUserDto {
  account_name: string;
  real_name: string;
  passwd: string;
  passwd_salt: string;
  mobile: string;
  role: number;
  user_status: number;
  create_by: number;
  create_time: Date;
  update_by: number;
  update_time: Date;
}

export class RegisterInfoDTO {
  @IsNotEmpty({ message: '用户名不能为空' })
  readonly accountName: string | number;

  @IsNotEmpty({ message: '真实姓名不能为空' })
  @IsString({ message: '真实姓名必须是 String 类型' })
  readonly realName: string;

  @IsNotEmpty({ message: '密码不能为空' })
  readonly password: string;

  @IsNotEmpty({ message: '重复密码不能为空' })
  readonly repassword: string;

  @IsNotEmpty({ message: '手机号不能为空' })
  @IsString({ message: '手机号必须是 String 类型' })
  readonly mobile: string;

  readonly role?: string | number;
}
