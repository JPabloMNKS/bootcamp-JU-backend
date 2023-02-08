import { Entity, ObjectIdColumn, ObjectID, Column } from 'typeorm';

@Entity()
export default class FileUploaderModel {
  @ObjectIdColumn()
  id!: string;

  @Column()
  name!: string;

  @Column()
  size!: string;

  @Column()
  driveID!: string;

  @Column()
  status!: string;
}
