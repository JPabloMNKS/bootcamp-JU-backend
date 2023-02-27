import 'reflect-metadata';
import { DataSource } from 'typeorm';
import DriveAccountModel from './models/driveAccount.model';
import FileUploaderModel from './models/fileUploader.model';
import FileToDriveModel from './models/fileToDrive.model';

export const AppDataSource = new DataSource({
  type: 'mongodb',
  database: 'db-uploader',
  synchronize: true,
  logging: false,
  entities: [DriveAccountModel, FileUploaderModel, FileToDriveModel],
  migrations: [],
  subscribers: [],
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
