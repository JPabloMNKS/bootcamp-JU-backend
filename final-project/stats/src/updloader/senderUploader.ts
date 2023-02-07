import amqp from 'amqplib';

async function sendMessage() {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  const queue = 'updloader';

  await channel.assertQueue(queue, {
    durable: false
  });

  channel.sendToQueue(queue, Buffer.from('Message to Uploader!'));
  console.log(" [x] Sent 'Message to Uploader!'");

  setTimeout(() => {
    connection.close();
    process.exit(0)
  }, 500);
}

sendMessage();
