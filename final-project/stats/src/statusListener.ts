import amqp from 'amqplib';
import { DriveAccountValues, FileReportValues } from './types';

async function receiveMessage() {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();

  const queueUploader = 'Uploader-Stats';
  const queueDownloader = 'Downloader-Stats';
  const queueDownloaderFile = 'Downloader-Stats-File';
  const queueDownloaderAccount = 'Downloader-Stats-Account';

  await channel.assertQueue(queueUploader, { durable: false });
  await channel.assertQueue(queueDownloader, { durable: false });
  await channel.assertQueue(queueDownloaderFile, { durable: false });
  await channel.assertQueue(queueDownloaderAccount, { durable: false });

  channel.consume(
    queueUploader,
    (message) => {
      const receivedMessage = JSON.parse(message!.content.toString());
    },
    { noAck: true }
  );

  channel.consume(
    queueDownloader,
    (message) => {
      const receivedMessage = JSON.parse(message!.content.toString());
    },
    { noAck: true }
  );

  channel.consume(
    queueDownloaderFile,
    async (message) => {
      const file = JSON.parse(message!.content.toString());
      if (file.id) {
        const fileReport: FileReportValues = {
          id: file.id,
          uploaderId: file.uploaderId,
          downloadsTotal: file.downloadsTotal + 1,
          downloadsToday: file.downloadsToday + 1,
          accumulatedSizeTotal: file.accumulatedSizeTotal + file.size,
          accumulatedSizeDay: file.accumulatedSizeDay + file.size,
        };
        await sendMessageToRabbit(
          'Stats-Downloader-File',
          JSON.stringify(fileReport)
        );
      } else {
        const fileReportElse: FileReportValues = {
          uploaderId: file.uploaderId,
          downloadsTotal: file.downloadsTotal + 1,
          downloadsToday: file.downloadsToday + 1,
          accumulatedSizeTotal: file.accumulatedSizeTotal + file.size,
          accumulatedSizeDay: file.accumulatedSizeDay + file.size,
        };
        await sendMessageToRabbit(
          'Stats-Downloader-File',
          JSON.stringify(fileReportElse)
        );
      }
    },
    { noAck: true }
  );

  channel.consume(
    queueDownloaderAccount,
    async (message) => {
      const account = JSON.parse(message!.content.toString());
      const accountReport: DriveAccountValues = {
        id: account.id,
        accountId: account.accountId,
        downloadsTotal: account.downloadsTotal + 1,
        downloadsToday: account.downloadsToday + 1,
        accumulatedSizeTotal: account.accumulatedSizeTotal + account.filesize,
        accumulatedSizeDay: account.accumulatedSizeDay + account.filesize,
      };
      await sendMessageToRabbit(
        'Stats-Downloader-Account',
        JSON.stringify(accountReport)
      );
    },
    { noAck: true }
  );
}

receiveMessage();

export async function sendMessageToRabbit(
  rabbitQueue: string,
  message: string
) {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  const queue = rabbitQueue;

  await channel.assertQueue(queue, {
    durable: false,
  });
  channel.sendToQueue(queue, Buffer.from(message));
}
