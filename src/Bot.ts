import { Client } from  "discord.js";
import ready from "./listeners/ready";
import interactionCreate from "./listeners/interactionCreate";
import { token,db } from './config.json';

console.log("Bot is starting...");

const client = new Client({
    intents: 3276799
});

ready(client);
interactionCreate(client);

client.login(token);





