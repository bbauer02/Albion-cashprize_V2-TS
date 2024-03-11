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
import {InformationEmbeddedBuilder} from "../embedded/InformationEmbeddedBuilder";
import {MessageType} from "../class/enum";

export const Paid: Command = {
    name: "paid",
    description: "Payer un ou des cashprizes",
    type: ApplicationCommandType.ChatInput,
    options: [{
        name : "ref",
        description: "Référence du CashPrize",
        type: ApplicationCommandOptionType.String,
        required:true
    },
    {
        name : "players",
        description: "Players Discord Account",
        type: ApplicationCommandOptionType.String,
        required: true,
    }],
    run: async (client: Client, interaction: CommandInteraction) => {
        const discordHelper : DiscordHelpers = new DiscordHelpers(client, interaction);
        let embeddedMessage : EmbedBuilder = new EmbedBuilder();

        const ref : string = <string>interaction.options.data[0].value;
        const players : string   = <string>interaction.options.data[1].value;
        if(players ) {
            const regex : RegExp = /<@(\d+)>/g;
            const matches : RegExpMatchArray | null = players.match(regex);
            if(matches !== null) {
                const ids: string[] | null = matches.map(match => match.replace(/<@|>/g, ''));

                const cashprize : ICashPrize | null = await Cashprize.findOne({reference:ref});
                


            }
        }

        //console.log(players);
        //const ids : string[]  | null= players.match(regex).map(match => match[1]);


        embeddedMessage = InformationEmbeddedBuilder(
            `:moneybag:CashPrize: ${ref}`,
            ` :white_check_mark: a reçu ses pièces d'argent!`, MessageType.application);
        await interaction.followUp(            {
            embeds : [embeddedMessage]
        })
    }
}