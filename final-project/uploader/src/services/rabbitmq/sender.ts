import amqp from 'amqplib';

async function sendMessage() {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  const queue = 'stats';

  await channel.assertQueue(queue, {
    durable: false
  });

  channel.sendToQueue(queue, Buffer.from('Message to Stats!'));
  console.log(" [x] Sent 'Message to Stats!'");

  setTimeout(() => {
    connection.close();
    process.exit(0)
  }, 500);
}

sendMessage();
