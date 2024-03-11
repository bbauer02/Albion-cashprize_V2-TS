import {Schema, model, Model} from 'mongoose';
import Member from "../../class/Member";


export interface ICashPrize {

    guildId:string,
    reference:string,
    sessionName:string,
    sessionDate:Date,
    authorId:string,
    authorName:string,
    coins:number,
    guildTaxe:number,
    members:Member[]
}


const CashPrizeSchema = new Schema<ICashPrize> ({
    guildId: { type: String, required: true },
    reference: { type: String, required: true },
    sessionName: { type: String, required: true },
    sessionDate: { type: Date, required: true },
    authorId: { type: String, required: true },
    authorName: { type: String, required: true },
    coins: { type: Number, required: true },
    guildTaxe: { type: Number, required: true },
    members: [{
        memberId: { type: String, required: true },
        memberName: { type: String, required: true },
        isPaid: { type: Boolean, required: true },
        datePaid: { type: String, required: false },
    }]
});


export const Cashprize = model<ICashPrize>('Cashprize', CashPrizeSchema);

