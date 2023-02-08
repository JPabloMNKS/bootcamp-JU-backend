import 'reflect-metadata';
import { DataSource } from 'typeorm';
import DriveAccountModel from './models/driveAccount.model';
import FileUploaderModel from './models/fileUploader.model';

export const AppDataSource = new DataSource({
  type: 'mongodb',
  database: 'db-uploader',
  synchronize: true,
  logging: false,
  entities: [DriveAccountModel, FileUploaderModel],
  migrations: [],
  subscribers: [],
  useUnifiedTopology: true,
});
