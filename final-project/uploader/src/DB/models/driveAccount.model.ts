import { Entity, ObjectIdColumn, Column } from 'typeorm';

@Entity('DriveAccount')
export default class DriveAccountModel {
  @ObjectIdColumn()
  id?: string;

  @Column()
  email: string;

  @Column()
  client_id: string;

  @Column()
  client_secret: string;

  @Column()
  redirect_uri: string;

  @Column()
  refresh_token: string;
}
