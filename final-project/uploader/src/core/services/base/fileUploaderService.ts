import { inject, injectable } from 'inversify';
import { myContainer } from '../../config/inversify.config';
import FileUploader from '../../Entities/fileUploader';
import { IFileUploaderRepository } from '../../Repository/IFileUploaderRepository';
import { DownloadFileValues, FileValues, TYPES } from '../../utils/types';
import { IDriveAccountService } from '../interfaces/IDriveAccountService';
import { IFileUploaderService } from '../interfaces/IFileUploaderService';
import DriveAccountModel from '../../../DB/models/driveAccount.model';
import FileUploaderModel from '../../../DB/models/fileUploader.model';
import DriveService from './googleDriveService';
import { GridFsService } from './gridFsService';

import { sendMessageToRabbit } from '../rabbitmq/sender';
import { IFileToDriveService } from '../interfaces/IFileToDriveService';
import DriveAccount from '../../Entities/driveAccount';

@injectable()
export class FileUploaderService implements IFileUploaderService {
  protected gridFsService: GridFsService;

  constructor(
    @inject(TYPES.IFileUploaderRepository)
    private fileUploaderRepository: IFileUploaderRepository,
    @inject(TYPES.IDriveAccountService)
    private driveAccountService: IDriveAccountService,

    @inject(TYPES.IFileToDriveService)
    private fileToDriveService: IFileToDriveService
  ) {
    this.gridFsService = new GridFsService();
  }

  async createFile(file: FileUploader) {
    const createdFile = await this.fileUploaderRepository.createFile(file);
    sendMessageToRabbit('Uploader-Drive', JSON.stringify(createdFile));
    return createdFile;
  }

  async deleteFile(fileID: string): Promise<void> {
    await this.setupDriveDelete(fileID);
    return await this.fileUploaderRepository.deleteFile(fileID);
  }
  getFiles(): Promise<FileUploader[]> {
    return this.fileUploaderRepository.getFiles();
  }
  getFileById(fileID: string): Promise<FileUploader> {
    return this.fileUploaderRepository.getFileByID(fileID);
  }
  updateFile(fileID: string, file: FileUploader): Promise<void> {
    return this.fileUploaderRepository.updateFile(fileID, file);
  }

  async setupDriveUpload(file: FileUploader) {
    const googleDriveAccounts =
      await this.driveAccountService.getDriveAccounts();
    const fileDriveIds = [];
    const downloadFileData: DownloadFileValues[] = [];
    for (const googleDriveAccount of googleDriveAccounts) {
      const newDownloadFileData = await this.uploadToDrive(
        googleDriveAccount,
        file
      );
      fileDriveIds.push(newDownloadFileData.driveId);
      downloadFileData.push(newDownloadFileData);
    }
    file.driveId = fileDriveIds.toString();
    file.status = 'Uploaded';
    await this.fileUploaderRepository.updateFile(file.id, file);
    return downloadFileData;
  }

  async uploadToDrive(
    googleDriveAccount: DriveAccountModel,
    file: FileUploaderModel
  ) {
    try {
      const googleDriveService = new DriveService(googleDriveAccount);
      const fileFromMongo = await this.gridFsService.getFileFromGridFS(
        file.filename
      );

      const uploadResponse = await googleDriveService.uploadFileToDrive(
        file,
        fileFromMongo
      );
      const fileUrls = await googleDriveService.generatePublicUrl(
        uploadResponse.id
      );
      const downloadFileData: DownloadFileValues = {
        uploaderId: file.id,
        driveId: uploadResponse.id,
        name: file.filename,
        webViewLink: fileUrls.webViewLink,
        webContentLink: fileUrls.webContentLink,
        size: file.size,
        accountId: googleDriveAccount.id,
      };

      const stringDownloadFile = JSON.stringify(downloadFileData);
      this.fileToDriveService.create(downloadFileData);

      sendMessageToRabbit('Uploader-Downloader-create', stringDownloadFile);

      return downloadFileData;
    } catch (error) {
      throw error;
    }
  }

  async setupDriveDelete(id: string) {
    const googleDriveAccounts =
      await this.driveAccountService.getDriveAccounts();
    for (const googleDriveAccount of googleDriveAccounts) {
      const driveFile =
        await this.fileToDriveService.readByUploaderIdAndAccountId(
          id,
          googleDriveAccount.id
        );

      await this.deleteFileFromDrive(driveFile.driveId, googleDriveAccount);

      await sendMessageToRabbit(
        'Uploader-Downloader-delete',
        JSON.stringify(driveFile)
      );

      await this.fileToDriveService.deleteByDriveIdAndAccountId(
        driveFile.driveId,
        googleDriveAccount.id
      );
    }
  }

  async deleteFileFromDrive(driveId: string, googleDriveAccount: DriveAccount) {
    try {
      const googleDriveService = new DriveService(googleDriveAccount);
      await googleDriveService.deleteFileFromDrive(driveId);
    } catch (error) {
      throw error;
    }
  }

  async setupNewAccountDriveUpload(googleDriveAccount: DriveAccount) {
    const files = await this.getFiles();
    const downloadFileData: DownloadFileValues[] = [];
    for (const file of files) {
      const newDownloadFileData = await this.uploadToDrive(
        googleDriveAccount,
        file
      );
      const driveIds = file.driveId.split(',');
      driveIds.push(newDownloadFileData.driveId);

      downloadFileData.push(newDownloadFileData);
    }
    return downloadFileData;
  }

  async setupAccountDriveFilesDelete(accountId: string) {
    const driveAccount = await this.driveAccountService.getDriveAccountById(
      accountId
    );

    const files = await this.fileToDriveService.readByAccountId(accountId);
    for (const file of files) {
      const driveFile =
        await this.fileToDriveService.readByUploaderIdAndAccountId(
          file.uploaderId,
          accountId
        );
      const account = await this.driveAccountService.getDriveAccountById(
        accountId
      );

      const fileToUpdate = await this.getFileById(file.uploaderId);
      const driveIdArray = fileToUpdate.driveId.split(',');

      const driveIdIndex = driveIdArray.indexOf(driveFile.driveId);
      if (driveIdIndex !== -1) {
        driveIdArray.splice(driveIdIndex, 1);
      }

      fileToUpdate.driveId = driveIdArray.join(',');
      await this.fileUploaderRepository.updateFile(
        fileToUpdate.driveId,
        fileToUpdate
      );

      await this.deleteFileFromDrive(driveFile.driveId, account);
      const fileToDelete = JSON.stringify(driveFile);
      sendMessageToRabbit('Uploader-Downloader-delete-file', fileToDelete);
      await this.fileToDriveService.delete(driveFile.id);
    }
    const accountToDelete = JSON.stringify(driveAccount);
    sendMessageToRabbit('Uploader-Drive-Account-delete', accountToDelete);
  }
}
