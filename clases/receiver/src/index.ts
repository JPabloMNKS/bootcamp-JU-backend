import amqp = require('amqplib/callback_api');

amqp.connect(
    {
        protocol: 'amqp',
        hostname: '192.168.100.5',
        port: 5672,
        username: 'admin',
        password: 'admin0'
    }, function (error0, connection){
        if(error0){ 
           console.log(error0);
        }

        connection.createChannel(function(error1, channel){
            if(error1){
                console.log(error1);
            }

            const queue = 'hello';

            channel.assertQueue(queue, {durable: false});

            console.log('Waiting for messages');

            channel.consume(queue, function(messages){
                if(messages){
                    console.log('Message received: ', messages.content.toString());
                }
            },{
                noAck: true
            });

        });
    }
);
