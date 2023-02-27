import { injectable } from 'inversify';
import { Repository } from 'typeorm/repository/Repository';
import dotenv from 'dotenv';
import { AppDataSource } from '../data-source';

import { IFileToDriveRepository } from '../../core/Repository/IFileToDriveRepository';
import FileToDriveModel from '../models/fileToDrive.model';
import FileToDrive from '../../core/Entities/fileToDrive';

dotenv.config();

@injectable()
export default class FileToDriveRepository implements IFileToDriveRepository {
  private fileUploaderRepository: Repository<FileToDriveModel>;

  constructor() {
    this.fileUploaderRepository =
      AppDataSource.getMongoRepository(FileToDriveModel);
  }
  async createFileToDrive(file: FileToDrive): Promise<FileToDrive> {
    return await this.fileUploaderRepository.save(file);
  }
  async deleteFileToDrive(fileID: string): Promise<void> {
    await this.fileUploaderRepository.delete(fileID);
  }
  async getFilesToDrive(): Promise<FileToDrive[]> {
    return await this.fileUploaderRepository.find();
  }
  async getFileToDriveByID(fileID: string): Promise<FileToDrive> {
    const repository = AppDataSource.getMongoRepository(FileToDriveModel);
    const file = await repository.findOneBy(fileID);

    if (!file) throw new Error('drive Account doesnt exists');
    return file;
  }
  async updateFileToDrive(
    fileID: string,
    fileUploader: FileToDrive
  ): Promise<void> {
    const repository = AppDataSource.getMongoRepository(FileToDriveModel);

    const fileToUpdate = await repository.findOneBy(fileID);
    if (!fileToUpdate) throw new Error('drive Account doesnt exists');
    await this.fileUploaderRepository.update(fileID, fileUploader);
  }

  async readByDriveIdAndAccountId (driveId: string, accountId: string) {
    const FileAccountFound = await this.fileUploaderRepository.findOneBy({
        driveId,
        accountId
    })

    if (FileAccountFound) {
      return FileAccountFound
    } else {
      return undefined
    }
  }

  async readByUploaderIdAndAccountId (uploaderId: string, accountId: string) {
    const FileAccountFound = await this.fileUploaderRepository.findOneBy({
        uploaderId,
        accountId
    })

    if (FileAccountFound) {
      return FileAccountFound
    } else {
      return undefined
    }
  }
}
