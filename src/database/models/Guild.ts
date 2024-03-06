import { Schema, model } from 'mongoose';

export interface IGuild {
    guildId:string,
    name:string,
    logo?:string|null|undefined,
    premium?:boolean,
    config: {
        channelId:string,
        lang:string,
        dateformat:string,
        timezone:string
    }
}

const GuildSchema = new Schema<IGuild> ({
    guildId: { type: String, required: true },
    name: { type: String, required: true },
    logo: { type: String, required: false },
    premium: { type: Boolean, required: false },
    config: {
        channelId: { type: String, required: true },
        lang: { type: String, required: true },
        dateformat: { type: String, required: true },
        timezone: { type: String, required: true },
    }
});
export const Guild = model<IGuild>('Guild', GuildSchema);