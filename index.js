const { Client, GatewayIntentBits } = require("discord.js");
require("dotenv").config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("messageCreate", (msg) => {
  if (msg.author.bot) return;
  if (msg.content.startsWith("create")) {
    const url = msg.content.split("create ")[1];
    return msg.reply({
      content: "Generating Short URL for " + url,
    });
  }
  msg.reply("Hi, from Choco 🤖");
});

client.on("interactionCreate", (interaction) => {
  interaction.reply("Pong");
});

client.login(process.env.TOKEN);
