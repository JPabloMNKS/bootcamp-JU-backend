import amqp from 'amqplib';

async function main() {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();

  // Creamos cuatro colas exclusivas para cada área (desarrollo, marketing, investigación y pruebas)
  const desarrolloQueue = await channel.assertQueue('', { exclusive: true });
  const marketingQueue = await channel.assertQueue('', { exclusive: true });
  const investigacionQueue = await channel.assertQueue('', { exclusive: true });
  const pruebasQueue = await channel.assertQueue('', { exclusive: true });

  // Enlazamos cada cola con el exchange "header-exchange" y establecemos un header para cada una
  // El header especifica el área correspondiente (desarrollo, marketing, investigación o pruebas)
  await channel.bindQueue(desarrolloQueue.queue, 'header-exchange', '', {
    area: 'desarrollo', region: 'americas', 'x-match': 'all',
  });
  await channel.bindQueue(marketingQueue.queue, 'header-exchange', '', {
    area: 'marketing', region: 'americas', 'x-match': 'any',
  });
  await channel.bindQueue(investigacionQueue.queue, 'header-exchange', '', {
    area: 'investigacion',
  });
  await channel.bindQueue(pruebasQueue.queue, 'header-exchange', '', {
    area: 'pruebas',
  });

  console.log('Esperando por los mensajes');

  // Consumimos los mensajes de la cola de desarrollo y los mostramos en la consola
  channel.consume(desarrolloQueue.queue, (msg) => {
    if (msg) {
      console.log(
        `Recibido mensaje para área de desarrollo: ${msg.content.toString()}`
      );
      // Acknowledge (ACK) el mensaje para confirmar su procesamiento
      channel.ack(msg);
    }
  });

  channel.consume(marketingQueue.queue, (msg) => {
    if (msg) {
      console.log(
        `Recibido mensaje para área de marketing: ${msg.content.toString()}`
      );
      channel.ack(msg);
    }
  });

  channel.consume(investigacionQueue.queue, (msg) => {
    if (msg) {
      console.log(
        `Recibido mensaje para área de investigación: ${msg.content.toString()}`
      );
      channel.ack(msg);
    }
  });

  channel.consume(pruebasQueue.queue, (msg) => {
    if (msg) {
      console.log(
        `Recibido mensaje para área de pruebas: ${msg.content.toString()}`
      );
      channel.ack(msg);
    }
  });
}

main().catch(console.error);
