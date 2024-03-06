import { CommandInteraction, Client, ApplicationCommandType, ApplicationCommandOptionType} from "discord.js";
import { Command} from "../Command";

export const Hello: Command = {
    name: "hello",
    description: "Returns a greeting",
    type: ApplicationCommandType.ChatInput,
    run: async (client: Client, interaction: CommandInteraction) => {
        const content = "Hello  ! ";

        await interaction.followUp({
            ephemeral:true,
            content
        })
    }
}