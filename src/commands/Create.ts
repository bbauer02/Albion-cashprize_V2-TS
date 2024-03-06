import {
    ApplicationCommandOptionType,
    ApplicationCommandType,
    Client,
    CommandInteraction,
    EmbedBuilder
} from "discord.js";
import {Command} from "../Command";
import {DiscordHelpers} from "../class/DiscordHelper";
import {InformationEmbeddedBuilder} from "../embedded/InformationEmbeddedBuilder";
import {MessageType} from "../class/enum";
import Member from "../class/Member";
import {Cashprize} from "../database/models/Cashprize";
import dayjs from "dayjs";
import {CreateEmbeddedBuilder} from "../embedded/CreateEmbeddedBuilder";

export const Create: Command = {
    name: "create",
    description: "Création d'un groupe",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
        name : "players",
        description: "Players Discord Account",
        type: ApplicationCommandOptionType.String,
        required: true,
    },
    {
        name : "gains",
        description: "Le gain total",
        type: ApplicationCommandOptionType.Number,
        required: true,
    },
    {
        name : "session_name",
        description: "The name of this cashprize",
        type: ApplicationCommandOptionType.String,
        required: false,
    },
    {
        name : "guild_taxe",
        description: "Guild Taxe percentage",
        type: ApplicationCommandOptionType.Integer,
        required: false
    }],
    run: async (client: Client, interaction: CommandInteraction) => {
        // instance du DiscordHelper avec le contexte de la commande
        const discordHelper = new DiscordHelpers(client, interaction);

        let embebbedMessage = new EmbedBuilder();

            const players =  discordHelper.getUserTagsFromCommand(<string>interaction.options.data[0].value) ;
            if( !players ) {
                embebbedMessage = embebbedMessage = InformationEmbeddedBuilder(
                    ":warning: Impossible de créer ce CashPrize !",
                    `Il faut ajouter au moins un joueur pour créer un **CashPrize** !`,
                    MessageType.error
                );
            }
            else {
                const coins = interaction.options.data[1].value;
                const sessionName = interaction.options.data.find(option => option.name == "session_name")?.value || `Session du ${dayjs(Date.now()).format('DD/MM/YYYY HH:mm')}`;
                const guildTaxe = interaction.options.data.find(option => option.name == "guild_taxe")?.value || 0;
                const authorId = interaction.user.id;
                const authorName = discordHelper.getUserById(authorId)?.displayName;
                const guildId = discordHelper.getGuildId();
                const members :Member[] = [];
                players.forEach(player => {
                    const memberId = discordHelper.convertUserTagToUserId(player);
                    members.push({
                        memberId,
                        memberName: discordHelper.getUserById(memberId)?.displayName || "N/C",
                        isPaid: false,
                        datePaid: null
                    });
                })
                const lastInserted = await Cashprize.find({guildId}).sort({"sessionDate": -1}).limit(1)
                let refId = 1;
                if(lastInserted.length > 0) {
                    refId = +lastInserted[0].reference.slice(3,lastInserted[0].reference.length) +1;
                }
                const cashprize = new Cashprize({
                    guildId,
                    reference: `ref${refId}`,
                    sessionName,
                    sessionDate: Date.now(),
                    authorId,
                    authorName,
                    coins,
                    guildTaxe,
                    members
                });

               const cashprizeAdded =  await cashprize.save();
               embebbedMessage=CreateEmbeddedBuilder(cashprizeAdded,interaction);
            }

        await interaction.followUp(
            {
                embeds : [embebbedMessage]
            });


    }
}