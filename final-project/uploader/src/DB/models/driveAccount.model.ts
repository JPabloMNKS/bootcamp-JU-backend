import { Entity, ObjectIdColumn, Column } from 'typeorm';

@Entity()
export default class DriveAccountModel {
  @ObjectIdColumn()
  id!: string;

  @Column()
  email!: string;

  @Column()
  googleDriveKey!: string;
}
