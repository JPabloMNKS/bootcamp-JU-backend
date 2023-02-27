import amqp from 'amqplib';

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
