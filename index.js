const { Client, GatewayIntentBits } = require("discord.js");
require("dotenv").config();
const connectToMongoDB = require("./connection");
const shortid = require("shortid");
const { generateShortID, findEntry } = require("./controllers/url");
const express = require("express");
const app = express();
const urlRouter = require("./routes/url");

connectToMongoDB("mongodb://localhost:27017/discord-bot").then(
  console.log("Connected to MongoDB")
);

app.use("/", urlRouter);

app.listen(3000, () => {
  console.log("Listening on PORT 3000");
});

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("messageCreate", async (msg) => {
  if (msg.author.bot) return;
  if (msg.content.startsWith("create")) {
    const url = msg.content.split("create ")[1];
    const shortID = await generateShortID(url);
    return msg.reply({
      content: "Here is your shortURL: http://localhost:3000/" + shortID,
    });
  }
  msg.reply("Hi, from Choco 🤖");
});

client.on("interactionCreate", (interaction) => {
  interaction.reply("Pong");
});

client.login(process.env.TOKEN);
