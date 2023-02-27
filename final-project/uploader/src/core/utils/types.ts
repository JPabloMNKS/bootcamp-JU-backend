const TYPES = {
  IFileUploaderRepository: Symbol.for('IFileUploaderRepository'),
  IFileUploaderService: Symbol.for('IFileUploaderService'),

  IDriveAccountRepository: Symbol.for('IDriveAccountRepository'),
  IDriveAccountService: Symbol.for('IDriveAccountService'),

  IFileToDriveRepository: Symbol.for('IFileToDriveRepository'),
  IFileToDriveService: Symbol.for('IFileToDriveService'),

};

export { TYPES };


export type FileStatus = "REPLICATING" | "UPLOADED";

export type DownloadFileValues = {
  [x: string]: any;
  uploaderId: string;
  driveId: string;
  name: string;
  webViewLink: string;
  webContentLink: string;
  size: number;
  accountId: string;
};

export type FileValues = {
  filename: string;
  originalname: string;
  size: number;
  mimetype: string;
  driveId?: string;
  status: string;
};