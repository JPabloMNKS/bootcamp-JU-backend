import { inject, injectable } from 'inversify';
import FileUploader from '../../Entities/fileUploader';
import { IFileUploaderRepository } from '../../Repository/IFileUploaderRepository';
import { TYPES } from '../../utils/types';
import { IFileUploaderService } from '../interfaces/IFileUploaderService';

@injectable()
export class FileUploaderService implements IFileUploaderService {
  constructor(
    @inject(TYPES.IFileUploaderRepository)
    private fileUploaderRepository: IFileUploaderRepository
  ) {}

  createFile(file: FileUploader): Promise<FileUploader> {
    return this.fileUploaderRepository.createFile(file);
  }
  async deleteFile(fileID: string): Promise<void> {
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
}
