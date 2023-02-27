import { DownloadFileValues } from '../../utils/types';

export interface IFileToDriveService {
  create(newDriveFileValues: DownloadFileValues);
  readByUploaderIdAndAccountId(uploaderId: string, accountId: string);
  deleteByDriveIdAndAccountId(driveId: string, accountId: string);
  delete(id: string);
  readByAccountId(accountId: string);
  readByUploaderIdAndAccountId(uploaderId: string, accountId: string);

}

