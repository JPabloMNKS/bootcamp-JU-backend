import amqp from 'amqplib';
import { myContainer } from '../../config/inversify.config';
import { TYPES } from '../../utils/types';
import { IFileUploaderService } from '../interfaces/IFileUploaderService';
import { IDriveAccountService } from '../interfaces/IDriveAccountService';

export async function receiveMessage() {
  const fileUploaderService = myContainer.get<IFileUploaderService>(
    TYPES.IFileUploaderService
  );
  const driveAccountService = myContainer.get<IDriveAccountService>(
    TYPES.IDriveAccountService
  );

  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  const queue = 'Uploader-Drive';
  const queueAccountCreate = 'Uploader-Drive-Account-create';
  const queueAccountDelete = 'Uploader-Drive-Account-delete';

  channel.assertQueue(queue, {
    durable: false,
  });
  channel.assertQueue(queueAccountCreate, {
    durable: false,
  });
  channel.assertQueue(queueAccountDelete, {
    durable: false,
  });

  channel.consume(
    queue,
    (msg) => {
      const message = JSON.parse(msg.content.toString());
      fileUploaderService.setupDriveUpload(message);
    },
    {
      noAck: true,
    }
  );
  channel.consume(
    queueAccountCreate,
    (msg) => {
      const message = JSON.parse(msg.content.toString());
      fileUploaderService.setupNewAccountDriveUpload(message);
    },
    {
      noAck: true,
    }
  );

  channel.consume(
    queueAccountDelete,
    (msg) => {
      const message = JSON.parse(msg.content.toString());
      driveAccountService.deleteDriveAccount(message.id);
    },
    {
      noAck: true,
    }
  );
}
