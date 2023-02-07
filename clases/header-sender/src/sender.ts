import amqp from 'amqplib';

async function main() {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();

  await channel.assertExchange('header-exchange', 'headers', {
    durable: false,
  });

  await channel.publish(
    'header-exchange',
    '',
    Buffer.from('Mensaje para desarrollo'),
    {
      headers: { area: 'desarrollo', region: 'americas' },
    }
  );

  await channel.publish(
    'header-exchange',
    '',
    Buffer.from('Mensaje para marketing'),
    { headers: { area: 'marketing', region: 'europa' } }
  );

  await channel.publish(
    'header-exchange',
    '',
    Buffer.from('Mensaje para investigación'),
    { headers: { area: 'investigacion' } }
  );

  await channel.publish(
    'header-exchange',
    '',
    Buffer.from('Mensaje para pruebas'),
    { headers: { area: 'pruebas' } }
  );

  console.log('Mensajes publicados');

  setTimeout(function () {
    connection.close();
    process.exit(0);
  }, 1000);
}

main().catch(console.error);
