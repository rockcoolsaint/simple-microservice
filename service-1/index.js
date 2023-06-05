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
  } catch(err) {
    console.log(err);
  }
}
connect_queue()

app.get("/send", async (req, res) => {
  const fakeData = {
    name: "Inno Musk",
    company: "SpaceX"
  };

  await channel.sendToQueue("rabbit", Buffer.from(JSON.stringify(fakeData)));
  await channel.close();
  await connection.close();

  return res.status(200).json({message: "Sent to rabbit channel"});
})

app.listen(5001, () => {
  console.log("Server at 5001");
});