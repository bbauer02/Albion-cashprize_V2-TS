import { Client} from "discord.js";
import {Commands} from "../Commands";
import { connect } from 'mongoose';
import {db} from "../config.json";

export default (client: Client) : void => {
    client.on("ready", async () => {
       if(!client.user || !client.application) {
           return;
       }

       await client.application.commands.set(Commands);

       console.log(`${client.user.username} is online`);

        await connect(db.mongodb.uri_local);
        console.log(`Mongo DB : Connected ! `);

    });
};

