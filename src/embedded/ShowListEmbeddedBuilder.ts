import {ColorResolvable, CommandInteraction, EmbedBuilder} from "discord.js";
import {ICashPrize} from "../database/models/Cashprize";
import {app} from '../config.json';

export const ShowListEmbeddedBuilder = (name:string, list :ICashPrize[])  : EmbedBuilder=> {

    const createEmbedded = new EmbedBuilder()
        .setThumbnail(app.embed.thumbnail)
        .setColor(<ColorResolvable>app.embed.color.application)
        .setFooter({ text: `Tapez '\\help'  pour avoir la liste des commandes disponible. \n CashPrize Manager version ${app.version}`, iconURL: undefined });


    createEmbedded.addFields({name: `CashPrize de : ${name}`, value:`La liste des CashPrizes que vous n'avez pas encore reçu.`, inline:false});

    let totalgain : number = 0;
    list.forEach(cashprize => {
        let message = `:notepad_spiral: **Référence:** \`${cashprize.reference}\`\n`;
        let guildCoins =0;
        if(cashprize.guildTaxe!==0) {
            guildCoins = Math.floor( cashprize.coins * (cashprize.guildTaxe/100) );
        }
        const gain = Math.floor((cashprize.coins - guildCoins) / cashprize.members.length);
        totalgain += gain;
        message += `:coin: **Gain:** ${gain.toString()} **pièces** \n`;
        message += `:incoming_envelope: **Contactez:** <@${cashprize.authorId}> \n\n`;

        createEmbedded.addFields({name: `# **${cashprize.sessionName}**`, value:message, inline:false});

    });

    createEmbedded.addFields({name: `:chart: Total à percevoir:`, value:`\u200B ${totalgain.toString()} **pièces**`, inline:false});


        return createEmbedded;
}
