import {Client, CommandInteraction, EmbedBuilder, Interaction} from "discord.js";
import {Commands} from "../Commands";
import {DiscordHelpers} from "../class/DiscordHelper";
import {GuildHelper} from "../class/GuildHelper";
import {IGuild} from "../database/models/Guild";
import {InformationEmbeddedBuilder} from "../embedded/InformationEmbeddedBuilder";
import {MessageType} from "../class/enum";


export default (client: Client) : void => {
    client.on("interactionCreate", async(interaction: Interaction)=> {
        if(interaction.isCommand() || interaction.isContextMenuCommand()) {
            await handleSlashCommand(client, interaction);
        }
    });

    const handleSlashCommand = async (client: Client, interaction: CommandInteraction): Promise<void> => {
        const slashCommand = Commands.find(c => c.name === interaction.commandName);
        if(!slashCommand) {
            await interaction.followUp({content: "An error has occurred"});
            return;
        }
        await interaction.deferReply();
        const discordHelper = new DiscordHelpers(client, interaction);
        const guildHelper = new GuildHelper();
        const isConfig: IGuild|Boolean = await guildHelper.isConfig(discordHelper.getGuildId());
       // const lang = isConfig && "config" in isConfig && isConfig.config.lang!=="" && isConfig.config.lang!==null && isConfig.config.lang!==undefined ? isConfig.config.lang : "EN";
        if((isConfig && "config" in isConfig && isConfig.config.channelId === interaction.channelId) || interaction.commandName==="config") {

            slashCommand.run(client, interaction);
        }
        else if(isConfig && "config" in isConfig && isConfig.config.channelId !== interaction.channelId) {
            let embebbedMessage = InformationEmbeddedBuilder(":warning:Commande saisie dans le mauvais canal:warning: ", `**CashPrize V2** s'utilise dans le canal :\n <#${isConfig.config.channelId}>`, MessageType.error)
            await interaction.followUp(
                {
                    embeds : [embebbedMessage]
                });
        }
        else {
            let embebbedMessage = InformationEmbeddedBuilder(":warning:Configuration manquante:warning: ", "Exécutez la commande `/config` avant d'utiliser **CashPrize V2**!", MessageType.error)
            await interaction.followUp(
                {
                    embeds : [embebbedMessage]
                });
        }




    }
};