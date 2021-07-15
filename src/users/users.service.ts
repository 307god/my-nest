import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as _ from 'lodash';
import { encryptPassword, makeSalt } from 'src/utils/cryptogram';
import { Connection, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private connection: Connection,
  ) {}

  async createMany(users: User[]) {
    await this.connection.transaction(async (manager) => {
      const user1 = new User();
      user1.user_id = 2;
      const user2 = new User();
      user2.user_id = 1;
      await manager.remove(user1);
      await manager.remove(user2);
    });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    for (const key in createUserDto) {
      user[key] === createUserDto[key];
    }
    return this.usersRepository.save(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(user: Partial<User>): Promise<User> {
    const result = _.omitBy(user, _.isNil);
    console.log(result);
    return this.usersRepository.findOne({
      where: result,
    });
  }

  async remove(user_id: number): Promise<void> {
    await this.usersRepository.delete(user_id);
  }

  async register(requestBody: any) {
    const { accountName, realName, password, repassword, mobile } = requestBody;
    if (password !== repassword) {
      return {
        code: 400,
        msg: '两次密码输入不一致',
      };
    }
    const user = await this.findOne({ account_name: accountName });
    if (user) {
      return {
        code: 400,
        msg: '用户已存在',
      };
    }
    const salt = makeSalt();
    const hashPwd = encryptPassword(password, salt);

    try {
      await this.create({
        account_name: accountName,
        real_name: realName,
        passwd: hashPwd,
        passwd_salt: salt,
        mobile,
        user_status: 1,
        role: 3,
        create_by: 0,
        update_by: 0,
        create_time: new Date(),
        update_time: new Date(),
      });
      return {
        code: 200,
        msg: 'success',
      };
    } catch (error) {
      return {
        code: 503,
        msg: `Service error: ${error}`,
      };
    }
  }
}
