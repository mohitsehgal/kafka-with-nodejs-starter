let dotenv = require("dotenv")
dotenv.config()

const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'demo-app',
  brokers: ['localhost:9092', 'localhost:9092'],
});


let main = async function(){
    const consumer = kafka.consumer({ groupId: 'test-group' })

    await consumer.connect()
    await consumer.subscribe({ topic: 'demo-topic', fromBeginning: true })
    
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log({
          value: message.value.toString(),
        })
      },
    })
};
main();