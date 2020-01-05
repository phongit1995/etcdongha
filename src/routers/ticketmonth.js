let express= require("express");
let router = express.Router();
let {checkIsLogin} = require('./../commons/checkPermisson');
let TicketMonth = require('./../controllers/ticketmonth');
router.get("/",checkIsLogin,TicketMonth.index);
router.post('/create',checkIsLogin,TicketMonth.createTicket);
router.post('/delete',checkIsLogin,TicketMonth.deleteTicket);
router.get('/getlist',checkIsLogin,TicketMonth.getListTicket);
module.exports  = router ;