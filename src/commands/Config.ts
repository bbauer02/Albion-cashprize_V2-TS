import { CommandInteraction, Client, ApplicationCommandType, ApplicationCommandOptionType} from "discord.js";
import { Command} from "../Command";
import {DiscordHelpers} from "../class/DiscordHelper";
import {Guild, IGuild} from "../database/models/Guild";
import {InformationEmbeddedBuilder} from "../embedded/InformationEmbeddedBuilder";
import {MessageType} from "../class/enum";
import { ObjectId } from "mongodb";

export const Config: Command = {
    name: "config",
    description: "Configuration de CashPrize",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name : "channel_id",
            description: "CashPrize Channel ID",
            type: ApplicationCommandOptionType.Channel,
            required: true,
        },
        {
            name: "langue",
            description: "Langue de l'application",
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [
                {
                    name: "Français",
                    value: "FR"
                },
                {
                    name: "English",
                    value: "GB"
                }
            ]
        },
        {
            name: "dateformat",
            description: "Format de la date",
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [
                {
                    name: "YYYY-MM-DD",
                    value: "YYYY-MM-DD"
                },
                {
                    name: "DD-MM-YYYY",
                    value: "DD-MM-YYYY"
                }
            ]
        }
    ],
    run: async (client: Client, interaction: CommandInteraction) => {
        const discordHelper = new DiscordHelpers(client, interaction);
        const guildId = discordHelper.getGuildId()||"";
        const name = discordHelper.getGuildName()||"";
        const logo = discordHelper.getGuildIcon();
        const channelId =<string> interaction.options.data[0].value;
        const lang=<string>interaction.options.data[1].value;
        const dateformat=<string>interaction.options.data[2].value;;
        const timezone = "gmt+1";


        const newConf :IGuild= {
            guildId,
            name,
            logo,
            config : {
                channelId,
                lang,
                dateformat,
                timezone
            }
        };

        const filter = { guildId };
        const guildConfig = await Guild.findOneAndUpdate(filter,newConf,{
            new: true,
            upsert: true // Make this update into an upsert
        })


        let message = `Vous pouvez utiliser **CashPrize V2**! Dès maintenant !\n\n`;
        message += `**Canal dédié:** <#${guildConfig.config.channelId}>.\n`;
        message += `**Configuration actuelle:** \n`;
        message += `**Nom du serveur:** ${guildConfig.name}\n`;
        message += `**Langue:** ${guildConfig.config.lang}\n`;
        message += `**Format de la date:** ${guildConfig.config.dateformat}\n`;
        message += `**Fuseau horaire:** ${guildConfig.config.timezone}\n`;




        let embedMessage = InformationEmbeddedBuilder(":white_check_mark: Configuration du Bot réussie:white_check_mark:  ", message, MessageType.success)
        await interaction.followUp(
            {
                embeds : [embedMessage]
            });
    }
}