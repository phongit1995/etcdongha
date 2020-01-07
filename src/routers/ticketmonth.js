let express= require("express");
let router = express.Router();
let {checkIsLogin} = require('./../commons/checkPermisson');
let TicketMonth = require('./../controllers/ticketmonth');
router.get("/",checkIsLogin,TicketMonth.index);
router.post('/create',checkIsLogin,TicketMonth.createTicket);
router.post('/delete',checkIsLogin,TicketMonth.deleteTicket);
router.get('/getlist',checkIsLogin,TicketMonth.getListTicket);
router.post('/getinfo',checkIsLogin,TicketMonth.getInfo);
router.post("/updateticket",checkIsLogin,TicketMonth.updateTicket);
router.post("/search",checkIsLogin,TicketMonth.searchTicket);
module.exports  = router ;