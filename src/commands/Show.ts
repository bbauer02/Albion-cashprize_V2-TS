import {
    CommandInteraction,
    Client,
    ApplicationCommandType,
    ApplicationCommandOptionType,
    EmbedBuilder
} from "discord.js";
import { Command} from "../Command";
import {DiscordHelpers} from "../class/DiscordHelper";
import {Cashprize, ICashPrize} from "../database/models/Cashprize";
import {ShowListEmbeddedBuilder} from "../embedded/ShowListEmbeddedBuilder";
import {ShowRefEmbeddedBuilder} from "../embedded/ShowRefEmbeddedBuilder";
import {InformationEmbeddedBuilder} from "../embedded/InformationEmbeddedBuilder";
import {MessageType} from "../class/enum";

export const Show: Command = {
    name: "show",
    description: "Afficher les cashprizes",
    type: ApplicationCommandType.ChatInput,
    options: [{
            name : "list",
            description: "Afficher la liste des cashprizes non payés",
            type: ApplicationCommandOptionType.Subcommand
        },
        {
            name : "ref",
            description: "Afficher le contenu d'un CashPrize",
            type: ApplicationCommandOptionType.Subcommand,
            options:[{
                name:"reference",
                description:"Numéro de référence",
                type:ApplicationCommandOptionType.String,
                required:true
            }]
        }],
    run: async (client: Client, interaction: CommandInteraction) => {
        const discordHelper : DiscordHelpers = new DiscordHelpers(client, interaction);
        let embeddedMessage : EmbedBuilder = new EmbedBuilder();
        const authorId : string = interaction.user.id;
        const authorName : string  = discordHelper.getUserById(authorId)?.displayName || "unknown user";

        // Lister tout les cashprizes non payé
        if(interaction.options.data[0].name === "list") {
           const list :ICashPrize[] = await Cashprize.find({
                guildId:interaction.guildId,
                members:{$elemMatch: {memberId:interaction.user.id, isPaid:false}}
            });

           if(list.length > 0) {
               embeddedMessage = ShowListEmbeddedBuilder(authorName,list);
           }  else {
               embeddedMessage = InformationEmbeddedBuilder(
                   `:moneybag:CashPrize de : ${authorName}`,
                   ` :warning: **Aucun CashPrize à percevoir !** \n\n Vous n'avez aucun cashprime en attente de paiment ! \n Participez à des activités avec la guilde pour en bénéficier.`, MessageType.application)
           }

        }

        // Afficher le contenu d'un CashPrize via sa référence
        if(interaction.options.data[0].name === "ref") {
            const ref : string = <string>interaction.options.get('reference')?.value
            const cashprize : ICashPrize | null = await Cashprize.findOne({reference:ref});
            if(cashprize) {
                embeddedMessage =ShowRefEmbeddedBuilder(cashprize, interaction);
            }
            else {
                embeddedMessage = InformationEmbeddedBuilder(":warning: Référence  introuvable !",`Le CashPrize avec la référence \`${ref}\` est introuvable.`, MessageType.error)
            }

        }
        await interaction.followUp(            {
            embeds : [embeddedMessage]
        })
    }
}