import FileUploader from '../Entities/fileUploader';

export interface IFileUploaderRepository {
  createFile(file: FileUploader): Promise<FileUploader>;
  deleteFile(fileID: string): Promise<void>;
  getFiles(): Promise<FileUploader[]>;
  getFileByID(fileID: string): Promise<FileUploader>;
  updateFile(fileID: string, file: FileUploader): Promise<void>;
}
