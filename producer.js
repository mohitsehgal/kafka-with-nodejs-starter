let dotenv = require("dotenv")
dotenv.config()

const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'demo-app',
  brokers: ['localhost:9092', 'localhost:9092'],
});

let main = async function(){
    const producer = kafka.producer()

    await producer.connect()
    await producer.send({
      topic: 'quickstart-events',
      messages: [
        { value: 'Hppy world!' },
      ],
    })
    
    await producer.disconnect()
};
main();