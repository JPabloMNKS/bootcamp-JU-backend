import { Entity, ObjectIdColumn, Column } from 'typeorm';

@Entity('File')
export default class FileUploaderModel {
  @ObjectIdColumn({ name: '_id' })
  id?: string;

  @Column()
  filename: string;

  @Column()
  originalName: string;

  @Column()
  size: number;

  @Column()
  mimetype: string;

  @Column()
  status: string;

  @Column()
  driveId?: string;
}
