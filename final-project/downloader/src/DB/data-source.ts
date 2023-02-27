import 'reflect-metadata';
import { DataSource } from 'typeorm';
import AccountInfoModel from './models/accountInfo.model';
import FileDownloadModel from './models/fileDownload.model';
import ReportModel from './models/report.model';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'db-download.sqlite',
  synchronize: true,
  logging: false,
  entities: [FileDownloadModel, AccountInfoModel, ReportModel],
});
