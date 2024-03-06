import { CommandInteraction, Client, ApplicationCommandType, ApplicationCommandOptionType} from "discord.js";
import { Command} from "../Command";
import {Cashprize, ICashPrize} from "../database/models/Cashprize";

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

        if(interaction.options.data[0].name === "list") {
           const list :ICashPrize[] = await Cashprize.find({
                guildId:interaction.guildId,
                members:{$elemMatch: {memberId:interaction.user.id, isPaid:false}}
            });

        }




        const content = "Show CashPrize  ! ";
       ;
        await interaction.followUp({
            ephemeral:true,
            content
        })
    }
}