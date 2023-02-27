import { inject, injectable } from 'inversify';
import { DownloadFileValues, TYPES } from '../../utils/types';
import { IFileToDriveService } from '../interfaces/IFileToDriveService';
import { IFileToDriveRepository } from '../../Repository/IFileToDriveRepository';
import FileToDrive from '../../Entities/fileToDrive';

@injectable()
export default class FileToDriveService implements IFileToDriveService {
  constructor(
    @inject(TYPES.IFileToDriveRepository)
    private fileToDriveRepository: IFileToDriveRepository
  ) {}

  async create(newDriveFileValues: DownloadFileValues) {
    const newDriveFile = new FileToDrive();
    newDriveFile.uploaderId = newDriveFileValues.uploaderId;
    newDriveFile.driveId = newDriveFileValues.driveId;
    newDriveFile.name = newDriveFileValues.name;
    newDriveFile.webViewLink = newDriveFileValues.webViewLink;
    newDriveFile.webContentLink = newDriveFileValues.webContentLink;
    newDriveFile.size = newDriveFileValues.size;
    newDriveFile.accountId = newDriveFileValues.accountId;
    await this.fileToDriveRepository.createFileToDrive(newDriveFile);
    return newDriveFile;
  }

  async readByUploaderIdAndAccountId(uploaderId: string, accountId: string) {
    const file = await this.fileToDriveRepository.readByUploaderIdAndAccountId(
      uploaderId,
      accountId
    );

    return file;
  }

  async deleteByDriveIdAndAccountId(driveId: string, accountId: string) {
    const file = await this.fileToDriveRepository.readByDriveIdAndAccountId(
      driveId,
      accountId
    );
    if (file) {
      await this.fileToDriveRepository.readByDriveIdAndAccountId(
        driveId,
        accountId
      );
    }
  }

  async delete(id: string) {
    const file = await this.fileToDriveRepository.getFileToDriveByID(id);
    if (file) {
      await this.fileToDriveRepository.deleteFileToDrive(id);
    }
  }

  async readByAccountId(accountId: string) {
    try {
      const files = await this.fileToDriveRepository.getFileToDriveByID(accountId);
      return files;
    } catch (error) {
      throw error;
    }
  }


}
