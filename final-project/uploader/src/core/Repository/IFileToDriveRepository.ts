import FileToDrive from '../Entities/fileToDrive';

export interface IFileToDriveRepository {
  createFileToDrive(file: FileToDrive): Promise<FileToDrive>;
  deleteFileToDrive(fileID: string): Promise<void>;
  getFilesToDrive(): Promise<FileToDrive[]>;
  getFileToDriveByID(fileID: string): Promise<FileToDrive>;
  updateFileToDrive(fileID: string, file: FileToDrive): Promise<void>;
  readByDriveIdAndAccountId(driveId: string, accountId: string);
  readByUploaderIdAndAccountId(uploaderId: string, accountId: string);
}
