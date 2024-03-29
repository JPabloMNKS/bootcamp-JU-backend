import amqp from 'amqplib';
import FileDownloadModel from '../../DB/models/fileDownload.model';
import { DownloadFileValues } from '../../utils/types';
import AccountInfoService from '../base/accountInfoService';
import FileDownloadService from '../base/fileDownloaderService';
import ReportService from '../base/reportService';
import AccountInfoModel from '../../DB/models/accountInfo.model';
import { Point, WriteApi } from '@influxdata/influxdb-client';
import AccountInfo from '../../entity/accountInfo';
import InfluxDbService from '../../../../uploader/src/core/services/base/influxDBService';

export async function receiveFromRabbit() {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();

  const queueUploaderCreateFile = 'Uploader-Downloader-create-file';
  const queueUploaderDeleteFile = 'Uploader-Downloader-delete-file';
  const queueUploaderCreateAccount = 'Uploader-Downloader-create-account';
  const queueUploaderDeleteAccount = 'Uploader-Downloader-delete-account';
  const queueStatsFile = 'Stats-Downloader-File';
  const queueStatsAccount = 'Stats-Downloader-Account';

  await channel.assertQueue(queueUploaderCreateFile, {
    durable: false,
  });
  await channel.assertQueue(queueUploaderDeleteFile, {
    durable: false,
  });
  await channel.assertQueue(queueUploaderCreateAccount, {
    durable: false,
  });
  await channel.assertQueue(queueUploaderDeleteAccount, {
    durable: false,
  });
  await channel.assertQueue(queueStatsFile, {
    durable: false,
  });
  await channel.assertQueue(queueStatsAccount, {
    durable: false,
  });

  channel.consume(
    queueUploaderCreateFile,
    async (message) => {
      const uploadedFile: DownloadFileValues = JSON.parse(
        message!.content.toString()
      );
      const downloadFileService = new FileDownloadService();
      const downloadFile = new FileDownloadModel();
      downloadFile.uploaderId = uploadedFile.uploaderId;
      downloadFile.driveId = uploadedFile.driveId;
      downloadFile.name = uploadedFile.name;
      downloadFile.webViewLink = uploadedFile.webViewLink;
      downloadFile.webContentLink = uploadedFile.webContentLink;
      downloadFile.size = uploadedFile.size;
      downloadFile.accountId = uploadedFile.accountId;

      await downloadFileService.create(downloadFile);
    },
    { noAck: true }
  );

  channel.consume(
    queueUploaderDeleteFile,
    async (message) => {
      const uploadedFile: DownloadFileValues = JSON.parse(
        message!.content.toString()
      );
      const downloadFileService = new FileDownloadService();
      const uploaderId = uploadedFile.uploaderId;
      const accountId = uploadedFile.accountId;

      await downloadFileService.deleteByUploaderAndAccountId(
        uploaderId,
        accountId
      );
    },
    { noAck: true }
  );

  channel.consume(
    queueStatsAccount,
    async (message) => {
      const accountReport: AccountInfo = JSON.parse(
        message!.content.toString()
      );
      const driveAccountService = new AccountInfoService();

      const point = new Point('accounts')
        .tag('account ID', accountReport.accountId)
        .floatField('Downloads today', accountReport.downloadsToday)
        .floatField('Downloads total', accountReport.downloadsTotal)
        .floatField(
          'Accumulated file size today',
          accountReport.accumulatedSizeDay
        )
        .floatField(
          'Accumulated file size total',
          accountReport.accumulatedSizeTotal
        )
        .timestamp(new Date());

      const influxDBService = new InfluxDbService();
      influxDBService.writeApi.writePoints([point]);

      await driveAccountService.updateOrCreateAccountByAccountId(accountReport);
    },
    { noAck: true }
  );

  channel.consume(
    queueStatsFile,
    async (message) => {
      const fileReport = JSON.parse(message!.content.toString());
      const fileReportService = new ReportService();

      const point = new Point('File Reports')
        .tag('Report file ID', fileReport.uploaderId)
        .floatField('Downloads today', fileReport.downloadsToday)
        .floatField('Downloads total', fileReport.downloadsTotal)
        .floatField(
          'Accumulated file size today',
          fileReport.accumulatedSizeDay
        )
        .floatField(
          'Accumulated file size total',
          fileReport.accumulatedSizeTotal
        )
        .timestamp(new Date());

      const influxDBService = new InfluxDbService();
      influxDBService.writeApi.writePoints([point]);

      if (fileReport.id) {
        await fileReportService.updateFileReport(fileReport);
      } else {
        await fileReportService.create(fileReport);
      }
    },
    { noAck: true }
  );

  channel.consume(
    queueUploaderCreateAccount,
    async (message) => {
      const newAccount: any = JSON.parse(message!.content.toString());
      const driveAccountService = new AccountInfoService();
      const driveAccount = new AccountInfoModel();
      driveAccount.accountId = newAccount.id;
      driveAccount.downloadsTotal = 0;
      driveAccount.downloadsToday = 0;
      driveAccount.consecutiveDownloads = 0;
      driveAccount.accumulatedSizeTotal = 0;
      driveAccount.accumulatedSizeDay = 0;

      await driveAccountService.create(driveAccount);
    },
    { noAck: true }
  );

  channel.consume(
    queueUploaderDeleteAccount,
    async (message) => {
      const updateAccount: any = JSON.parse(message!.content.toString());
      const driveAccountService = new AccountInfoService();
      const accountId = updateAccount.id;
      const updateInactiveAccount = {
        consecutiveDownloads: 0,
      };

      await driveAccountService.updateInactiveAccountByAccountId(
        accountId,
        updateInactiveAccount
      );
    },
    { noAck: true }
  );
}
