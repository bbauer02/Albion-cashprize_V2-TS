export default interface Member {
    memberId:string,
    memberName:string,
    isPaid:boolean,
    datePaid?:string|null
}