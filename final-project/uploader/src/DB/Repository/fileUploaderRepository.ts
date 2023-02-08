import { injectable } from 'inversify';
import { Repository } from 'typeorm/repository/Repository';
import dotenv from 'dotenv';
import { AppDataSource } from '../data-source';
import FileUploaderModel from '../models/fileUploader.model';
import FileUploader from '../../core/Entities/fileUploader';
import { IFileUploaderRepository } from '../../core/Repository/IFileUploaderRepository';
dotenv.config();

@injectable()
export default class FileUploaderRepository implements IFileUploaderRepository {
  private fileUploaderRepository: Repository<FileUploader>;

  constructor() {
    this.fileUploaderRepository =
      AppDataSource.getMongoRepository(FileUploaderModel);
  }
  async createFile(file: FileUploader): Promise<FileUploader> {
    return await this.fileUploaderRepository.save(file);
  }
  async deleteFile(fileID: string): Promise<void> {
    await this.fileUploaderRepository.delete(fileID);
  }
  async getFiles(): Promise<FileUploader[]> {
    return await this.fileUploaderRepository.find();
  }
  async getFileByID(fileID: string): Promise<FileUploader> {
    
    const file = await this.fileUploaderRepository.findOneBy({
      id: fileID,
    });
    
    if (!file) throw new Error('drive Account doesnt exists');
    return file;
  }
  async updateFile(fileID: string, fileUploader: FileUploader): Promise<void> {
    const fileToUpdate = await this.fileUploaderRepository.findOneBy({
      id: fileID,
    });
    if (!fileToUpdate) throw new Error('drive Account doesnt exists');
    await this.fileUploaderRepository.update(fileID, fileUploader);
  }
}
