import DriveAccountModel from '../../../DB/models/driveAccount.model';
import FileUploaderModel from '../../../DB/models/fileUploader.model';
import DriveAccount from '../../Entities/driveAccount';
import FileUploader from '../../Entities/fileUploader';

export interface IFileUploaderService {
  createFile(file: FileUploader);
  deleteFile(fileID: string): Promise<void>;
  getFiles(): Promise<FileUploader[]>;
  getFileById(fileID: string): Promise<FileUploader>;
  updateFile(fileID: string, file: FileUploader): Promise<void>;
  uploadToDrive(googleDriveAccount: DriveAccountModel, file: FileUploaderModel);
  setupDriveUpload(file: FileUploader);
  setupDriveDelete(id: string): Promise<void>;
  deleteFileFromDrive(
    driveId: string,
    googleDriveAccount: DriveAccount
  ): Promise<void>;
  setupNewAccountDriveUpload(googleDriveAccount: DriveAccount);
}
