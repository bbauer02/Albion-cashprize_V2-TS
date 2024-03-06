import {Guild, IGuild} from "../database/models/Guild";


export class GuildHelper {
    private guild: IGuild|null;
    constructor() {
        this.guild = null;
    }
    public async isConfig(guildId:string|null) :Promise<IGuild | boolean>{
       /* const guild = new Guild({
            guildId,
            name:"name",
            logo:"",
            premium:false,
            config: {
                channelId:"1042458264350236702",
                lang:"fr",
                dateformat:"dd/mm/yyyy",
                timezone:"gmt+1"
            }
        });
        await guild.save();*/
        if(!guildId)
            return false;
        this.guild = await Guild.findOne({guildId});
        if(!this.guild)
            return false;
        return this.guild;
    }






}