import FileUploader from '../../Entities/fileUploader';

export interface IFileUploaderService {
  createFile(file: FileUploader): Promise<FileUploader>;
  deleteFile(fileID: string): Promise<void>;
  getFiles(): Promise<FileUploader[]>;
  getFileById(fileID: string): Promise<FileUploader>;
  updateFile(fileID: string, file: FileUploader): Promise<void>;
}
