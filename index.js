// Log in to Discord with your client's token
const { Client, GatewayIntentBits } = require('discord.js');
const { CommandHandler } = require('djs-commander');
const { token } = require('./config.json');
const path = require('path');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});


new CommandHandler({
  client, // Discord.js client object | Required by default
  commandsPath: path.join(__dirname, 'commands'), // The commands directory
  eventsPath: path.join(__dirname, 'events'), // The events directory

});
client.login(token);
