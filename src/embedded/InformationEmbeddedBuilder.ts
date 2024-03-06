import {ColorResolvable, EmbedBuilder} from "discord.js";
import {app} from '../config.json';
import {MessageType} from "../class/enum";

export const InformationEmbeddedBuilder = (titre:string, message:string, type: MessageType) : EmbedBuilder => {
    let color:ColorResolvable = <ColorResolvable>app.embed.color.application;
    switch (type) {
        case MessageType.information :
            color = <ColorResolvable>app.embed.color.information;
            break;
        case MessageType.error :
            color = <ColorResolvable>app.embed.color.error;
            break;
        case MessageType.application :
            color = <ColorResolvable>app.embed.color.application;
            break;
        case MessageType.warning :
            color = <ColorResolvable>app.embed.color.warning;
            break;
        case MessageType.success :
            color = <ColorResolvable>app.embed.color.success;
            break;
    }
    const informationEmbedded = new EmbedBuilder()
        .setColor(color)
        .setThumbnail(app.icon)
        .setTitle(titre)
        .setDescription(message)
        .setTimestamp()
        .setFooter({ text: `Tapez '\\help'  pour avoir la liste des commandes disponible. \n CashPrize Manager version ${app.version}`, iconURL: undefined });
    return informationEmbedded;
}