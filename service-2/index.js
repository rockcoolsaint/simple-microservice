import { connect } from "amqplib";
import express from "express";
const app = express();
var channel, connection;

// connect()
async function connect_queue() {
  try {
    const ampqServer = "amqp://localhost:5672";
    connection = await connect(ampqServer);
    channel = await connection.createChannel();
    await channel.assertQueue("rabbit");

    channel.consume("rabbit", data => {
      console.log(`Received ${Buffer.from(data.content)}`);

      channel.ack(data);
    })
  } catch(err) {
    console.log(err);
  }
}
connect_queue()

// app.get("/send", async (req, res) => {
// })

app.listen(5002, () => {
  console.log("Server at 5002");
});