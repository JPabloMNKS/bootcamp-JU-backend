import { Container } from 'inversify';
import { TYPES } from '../utils/types';

import DriveAccountRepository from '../../DB/Repository/driveAccountRepository';
import { IDriveAccountRepository } from '../Repository/IDriveAccountRepository';
import { DriveAccountService } from '../services/base/driveAccountService';
import { IDriveAccountService } from '../services/interfaces/IDriveAccountService';

import FileUploaderRepository from '../../DB/Repository/fileUploaderRepository';
import { IFileUploaderRepository } from '../Repository/IFileUploaderRepository';
import { IFileUploaderService } from '../services/interfaces/IFileUploaderService';
import { FileUploaderService } from '../services/base/fileUploaderService';

import { IFileToDriveRepository } from '../Repository/IFileToDriveRepository';
import FileToDriveRepository from '../../DB/Repository/fileToDriveRepository';
import FileToDriveService from '../services/base/fileToDriveService';
import { IFileToDriveService } from '../services/interfaces/IFileToDriveService';

const myContainer = new Container();

myContainer.bind<IFileUploaderRepository>(TYPES.IFileUploaderRepository).to(FileUploaderRepository);
myContainer.bind<IFileUploaderService>(TYPES.IFileUploaderService).to(FileUploaderService);

myContainer.bind<IDriveAccountRepository>(TYPES.IDriveAccountRepository).to(DriveAccountRepository);
myContainer.bind<IDriveAccountService>(TYPES.IDriveAccountService).to(DriveAccountService);

myContainer.bind<IFileToDriveRepository>(TYPES.IFileToDriveRepository).to(FileToDriveRepository);
myContainer.bind<IFileToDriveService>(TYPES.IFileToDriveService).to(FileToDriveService);

export { myContainer };
