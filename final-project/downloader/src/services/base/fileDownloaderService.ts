import FileDownloadRepository from '../../DB/repository/fileDownloadRepository';
import FileDownloadModel from '../../DB/models/fileDownload.model';
import AccountInfoService from './accountInfoService';
import AccountInfoModel from '../../DB/models/accountInfo.model';
import ReportService from './reportService';
import {
  AccountStatsValues,
  DownloadFileValues,
  FileReportValues,
  NewFileReportValues,
} from '../../utils/types';
import { sendMessageToRabbit } from '../rabbitmq/sender';

export default class FileDownloadService {
  protected downloadFileRepository: FileDownloadRepository;
  protected driveAccountService: AccountInfoService;
  protected fileReportService: ReportService;

  constructor() {
    this.downloadFileRepository = new FileDownloadRepository();
    this.driveAccountService = new AccountInfoService();
    this.fileReportService = new ReportService();
  }

  async create(downloadFile: FileDownloadModel) {
    const createdFile = await this.downloadFileRepository.create(downloadFile);
    const succesfulCreate = {
      file: createdFile,
    };
    return succesfulCreate;
  }

  async read(id: string) {
    const file = await this.downloadFileRepository.read(id);
    return file;
  }

  async readAll() {
    const files = await this.downloadFileRepository.readAll();
    return files;
  }

  async readByUploaderId(uploaderId: string) {
    const file = await this.downloadFileRepository.readByUploaderId(uploaderId);
    return file;
  }

  async readByUploaderIdAndAccountId(uploaderId: string, accountId: string) {
    const file = await this.downloadFileRepository.readByUploaderIdAndAccountId(
      uploaderId,
      accountId
    );
    return file;
  }

  async update(id: string, updatedFileValues: DownloadFileValues) {
    const downloadedFile = await this.read(id);
    if (!downloadedFile) {
      throw new Error('Download file not found');
    }

    downloadedFile.uploaderId =
      updatedFileValues.uploaderId ?? downloadedFile.uploaderId;
    downloadedFile.driveId =
      updatedFileValues.driveId ?? downloadedFile.driveId;
    downloadedFile.webViewLink =
      updatedFileValues.webViewLink ?? downloadedFile.webViewLink;
    downloadedFile.webContentLink =
      updatedFileValues.webContentLink ?? downloadedFile.webContentLink;
    downloadedFile.size = updatedFileValues.size ?? downloadedFile.size;
    downloadedFile.accountId =
      updatedFileValues.accountId ?? downloadedFile.accountId;

    const updatedFile = await this.downloadFileRepository.update(
      downloadedFile
    );
    return updatedFile;
  }

  async delete(id: string) {
    return await this.downloadFileRepository.delete(id);
  }

  async deleteByUploaderAndAccountId(uploaderId: string, accountId: string) {
    const fileToDelete =
      await this.downloadFileRepository.readByUploaderIdAndAccountId(
        uploaderId,
        accountId
      );

    if (!fileToDelete) {
      return;
    }

    await this.downloadFileRepository.deleteByUploaderAndAccountId(
      uploaderId,
      accountId
    );
  }

  async getWebLinks(uploaderId: string) {
    const driveAccount = await this.driveAccountService.getOptimizedAccount();
    const fileToDownload =
      await this.downloadFileRepository.readByUploaderIdAndAccountId(
        uploaderId,
        driveAccount?.accountId
      );

    if (!driveAccount || !fileToDownload) {
      return { 'file ': 'not found' };
    }

    driveAccount.consecutiveDownloads += 1;
    const accountStats: AccountStatsValues = {
      id: driveAccount.id,
      accountId: driveAccount.accountId,
      downloadsTotal: driveAccount.downloadsTotal,
      downloadsToday: driveAccount.downloadsToday,
      accumulatedSizeTotal: driveAccount.accumulatedSizeTotal,
      accumulatedSizeDay: driveAccount.accumulatedSizeDay,
      filesize: fileToDownload.size,
    };
    await sendMessageToRabbit(
      'Downloader-Stats-Account',
      JSON.stringify(accountStats)
    );

    const fileToStats = await this.fileReportService.readByUploaderId(
      uploaderId
    );

    const newFileToStats: FileReportValues = {
      id: fileToStats?.id,
      uploaderId: fileToDownload.uploaderId,
      downloadsTotal: fileToStats?.downloadsTotal ?? 0,
      downloadsToday: fileToStats?.downloadsToday ?? 0,
      accumulatedSizeTotal: fileToStats?.accumulatedSizeTotal ?? 0,
      accumulatedSizeDay: fileToStats?.accumulatedSizeDay ?? 0,
      size: fileToDownload.size,
    };
    await sendMessageToRabbit(
      'Downloader-Stats-File',
      JSON.stringify(newFileToStats)
    );

    await this.driveAccountService.updateOrCreateAccountByAccountId(
      driveAccount
    );
    const filterAccounts =
      await this.driveAccountService.getAllAccountsExceptOne(
        driveAccount.accountId
      );
    filterAccounts.forEach((account: AccountInfoModel) => {
      account.consecutiveDownloads = 0;
      this.driveAccountService.updateOrCreateAccountByAccountId(account);
    });

    return {
      'File name': fileToDownload.name,
      'Download link': fileToDownload.webContentLink,
      'View link': fileToDownload.webViewLink,
    };
  }

  // async getWebLinks(uploaderId: string) {
  //   const driveAccount = await this.driveAccountService.getOptimizedAccount();
  //   const fileToDownload =
  //     await this.downloadFileRepository.readByUploaderIdAndAccountId(
  //       uploaderId,
  //       driveAccount.accountId
  //     );    

  //   if (driveAccount && fileToDownload) {
  //     driveAccount.consecutiveDownloads += 1;
  //     const accountToStats: AccountStatsValues = {
  //       id: driveAccount.id,
  //       accountId: driveAccount.accountId,
  //       downloadsTotal: driveAccount.downloadsTotal,
  //       downloadsToday: driveAccount.downloadsToday,
  //       accumulatedSizeTotal: driveAccount.accumulatedSizeTotal,
  //       accumulatedSizeDay: driveAccount.accumulatedSizeDay,
  //       filesize: fileToDownload.size,
  //     };
  //     await sendMessageToRabbit(
  //       'Downloader-Stats-Account',
  //       JSON.stringify(accountToStats)
  //     );
  //     const uploaderIdFile = fileToDownload.uploaderId;
  //     try {
  //       const fileToStats = await this.fileReportService.readByUploaderId(
  //         uploaderIdFile
  //       );
  //       const newFileToStats: FileReportValues = {
  //         id: fileToStats.id,
  //         uploaderId: fileToStats.uploaderId,
  //         downloadsTotal: fileToStats.downloadsTotal,
  //         downloadsToday: fileToStats.downloadsToday,
  //         accumulatedSizeTotal: fileToStats.accumulatedSizeTotal,
  //         accumulatedSizeDay: fileToStats.accumulatedSizeDay,
  //         size: fileToDownload.size,
  //       };
  //       await sendMessageToRabbit(
  //         'Downloader-Stats-File',
  //         JSON.stringify(newFileToStats)
  //       );
  //     } catch (error) {
  //       const newFileToStats2: NewFileReportValues = {
  //         uploaderId: fileToDownload.uploaderId,
  //         downloadsTotal: 0,
  //         downloadsToday: 0,
  //         accumulatedSizeTotal: 0,
  //         accumulatedSizeDay: 0,
  //         size: fileToDownload.size,
  //       };
  //       await sendMessageToRabbit(
  //         'Downloader-Stats-File',
  //         JSON.stringify(newFileToStats2)
  //       );
  //     }

  //     await this.driveAccountService.updateOrCreateAccountByAccountId(
  //       driveAccount
  //     );
  //     const filterAccounts =
  //       await this.driveAccountService.getAllAccountsExceptOne(
  //         driveAccount.accountId
  //       );

  //     filterAccounts.forEach((account: AccountInfoModel) => {
  //       account.consecutiveDownloads = 0;
  //       this.driveAccountService.updateOrCreateAccountByAccountId(account);
  //     });

  //     return {
  //       'File name': fileToDownload.name,
  //       'Download link': fileToDownload.webContentLink,
  //       'View link': fileToDownload.webViewLink,
  //     };
  //   }
  //   return {
  //     'file ': 'not found',
  //   };
  // }
}
