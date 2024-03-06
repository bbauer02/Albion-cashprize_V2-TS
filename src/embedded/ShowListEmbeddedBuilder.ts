import {ColorResolvable, CommandInteraction, EmbedBuilder} from "discord.js";
import {ICashPrize} from "../database/models/Cashprize";
import {app} from '../config.json';

export const ShowListEmbeddedBuilder = (name:string, list :ICashPrize[])  : EmbedBuilder=> {

    const createEmbedded = new EmbedBuilder()
        .setColor(<ColorResolvable>app.embed.color.application)

    createEmbedded.addFields({name: `CashPrize de : ${name}`, value:`La liste des CashPrizes que vous n'avez pas encore reçu.`, inline:false});



    return createEmbedded;
}