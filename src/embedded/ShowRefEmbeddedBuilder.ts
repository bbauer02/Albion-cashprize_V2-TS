import {ColorResolvable, CommandInteraction, EmbedBuilder} from "discord.js";
import {ICashPrize} from "../database/models/Cashprize";
import {app} from '../config.json';

export const ShowRefEmbeddedBuilder = (cashprize : ICashPrize, interaction:CommandInteraction )  : EmbedBuilder=> {

    const createEmbedded = new EmbedBuilder()
        .setThumbnail(app.embed.thumbnail)
        .setColor(<ColorResolvable>app.embed.color.application)
        .setAuthor({
            name: `Contactez: ${cashprize.authorName}`,
            iconURL: interaction.user.displayAvatarURL()
        })
        .setFooter({ text: `Tapez '\\help'  pour avoir la liste des commandes disponible. \n CashPrize Manager version ${app.version}`, iconURL: undefined });

    let message =`:moneybag: **Total des gains:** ${cashprize.coins.toString()} **pièces** \n`;
    let guildCoins =0;

    if(cashprize.guildTaxe!==0) {
        guildCoins = Math.floor( cashprize.coins * (cashprize.guildTaxe/100) );
        message += `:bar_chart: **Taxe de ${cashprize.guildTaxe}% pour la Guilde:** ${guildCoins.toString()} **pièces** \n`;
    }
    const gain = Math.floor((cashprize.coins - guildCoins) / cashprize.members.length);

    message += `:coin: **Gain par personne:** ${gain.toString()} **pièces** \n`;
    message += `:classical_building: **Part de la guilde:** ${guildCoins.toString()} **pièces** \n\n`;
    message += `**Bénéficiaire(s):**\n`;
    cashprize.members.forEach(member => {
        message+=`${member.isPaid? ':white_check_mark:' : ':red_square:' }<@${member.memberId}>\n`;
    })

    createEmbedded.addFields({ name: `:notepad_spiral: Référence : \`\`\`${cashprize.reference}\`\`\``,
        value: message,
        inline: false });

    return createEmbedded;
}

