import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity('Files')
export default class FileDownloadModel extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  uploaderId: string;

  @Column()
  driveId: string;

  @Column()
  webViewLink: string;

  @Column()
  webContentLink: string;

  @Column()
  name: string;

  @Column()
  size: number;

  @Column()
  accountId: string;
}
