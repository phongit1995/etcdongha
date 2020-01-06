let {getListTicketExpired}  = require('./../models/ticket');
const EXPRIEDDAYS = 3 ;
let getNotifiCation= async (req)=>{
   return await Promise.all([notifiCationSTicketExpried(req)]);
}

let notifiCationSTicketExpried = async (req)=>{
    let {Role,Group,Id} = req.user ;
    let listTicket = await getListTicketExpired(Role,Group,EXPRIEDDAYS);
    return {
        number:listTicket[0].length,
        link:"/ticketmonth/"
    }
}
module.exports = getNotifiCation ;