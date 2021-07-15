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
