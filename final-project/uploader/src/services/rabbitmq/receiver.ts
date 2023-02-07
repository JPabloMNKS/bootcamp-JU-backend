import amqp from 'amqplib';

async function receiveMessage() {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  const queue = 'updloader';

  await channel.assertQueue(queue, {
    durable: false
  });

  console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

  channel.consume(queue, (message) => {
    console.log(" [x] Received %s", message?.content.toString());
  }, {
    noAck: true
  });
}

receiveMessage();
