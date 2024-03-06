import {Client, CommandInteraction, GuildManager, GuildMember, User} from "discord.js";
import Member from "./Member";
import {promises} from "dns";


export class DiscordHelpers {
    private client: Client;
    private interaction: CommandInteraction;

    constructor(client: Client, interaction: CommandInteraction) {
        this.client = client;
        this.interaction = interaction;
    }

    getGuildId() :string | null {
        return this.interaction.guildId;
    }
    getGuildName() : string | undefined  {
        return this.interaction.guild?.name;
    }
    getGuildIcon() : string | null | undefined  {
        return this.interaction.guild?.iconURL();
    }


    getUserTagsFromCommand(arg : string)  : string[] {
        const regex = /\<@(.+?)\>/g;
        const players =  arg.match(regex);
        if(!players) return [];
        return players;
    }
    /**
     * Format l'identifiant Discord sans les décorateurs
     * "<@" et ">"
     * */
    convertUserTagToUserId(userTag : string) {
        if(userTag.includes("<@") && userTag.includes(">")) {
            return userTag.slice(2,userTag.length-1);
        }
        return userTag;
    }

    getUserById(userId : string) : GuildMember | null | undefined {
        return this.interaction.guild?.members.cache.find(guildMember => {
            if(guildMember.id == userId) {
                return guildMember;
            }
        });
    }

    isMember(userId : string) : boolean | undefined{
        return this.interaction.guild?.members.cache.some(guildMember => guildMember.id ==userId);
    }

    MembersListToString(members: Member[]) :string {
        let membersString :string = "";
        members.forEach(member => {
            const guildMember = this.getUserById(member.memberId);
            if(guildMember) {
                membersString += `${guildMember.nickname}\n`;
            }
            else {
                membersString += `${member.memberName}\n`;
            }
        })
        return membersString;
    }







}