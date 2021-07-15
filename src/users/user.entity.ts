import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('admin_user')
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column()
  account_name: string;

  @Column()
  real_name: string;

  @Column()
  passwd: string;

  @Column()
  passwd_salt: string;

  @Column({ default: '0' })
  mobile: string;

  @Column()
  role: number;

  @Column()
  user_status: number;

  @Column()
  create_by: number;

  @Column()
  create_time: Date;

  @Column()
  update_by: number;

  @Column()
  update_time: Date;
}
