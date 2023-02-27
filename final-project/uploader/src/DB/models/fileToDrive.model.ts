import { Entity, Column, ObjectIdColumn } from 'typeorm';

@Entity('DriveFile')
export default class FileToDriveModel {
  @ObjectIdColumn()
  id?: string;

  @Column()
  uploaderId: string;

  @Column()
  driveId: string;

  @Column()
  name: string;

  @Column()
  webViewLink: string;

  @Column()
  webContentLink: string;

  @Column()
  size: number;

  @Column()
  accountId: string;
}
