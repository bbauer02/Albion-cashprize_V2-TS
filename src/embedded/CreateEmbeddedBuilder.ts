import {ColorResolvable, CommandInteraction, EmbedBuilder} from "discord.js";
import {ICashPrize} from "../database/models/Cashprize";
import {app} from '../config.json';

export const CreateEmbeddedBuilder = (cashprize: ICashPrize,interaction:CommandInteraction)  : EmbedBuilder=> {

    const createEmbedded = new EmbedBuilder()
        .setColor(<ColorResolvable>app.embed.color.application)
        .setTitle(`${cashprize.sessionName}`)
        .setURL(app.embed.url)
        .setAuthor({
            name: `Créé par : ${cashprize.authorName}`,
            iconURL: interaction.user.displayAvatarURL()
        })
        .setThumbnail(app.embed.thumbnail);

    let message =`:moneybag: **Total des gains:** ${cashprize.coins.toString()} **pièces** \n`;
    let guildCoins =0;
    if(cashprize.guildTaxe!==0) {
        guildCoins = Math.floor( cashprize.coins * (cashprize.guildTaxe/100) );
        message += `:bar_chart: **Taxe de ${cashprize.guildTaxe}% pour la Guilde:** ${guildCoins.toString()} **pièces** \n`;
    }
    const gain = Math.floor((cashprize.coins - guildCoins) / cashprize.members.length);
    message += `:coin: **Gain par personne:** ${gain.toString()} **pièces** \n\n`;
    message += `**Bénéficiaire(s):**\n`;
    cashprize.members.forEach(member => {
        message+=`<@${member.memberId}>\n`;
    })

    createEmbedded.addFields({ name: `:notepad_spiral: Référence : \`\`\`${cashprize.reference}\`\`\``,
            value: message,
            inline: false });


    return createEmbedded;
}