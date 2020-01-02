let express= require("express");
let router = express.Router();
let {checkIsLogin} = require('../commons/checkPermisson');
let Me = require('./../controllers/me');
router.get("/",checkIsLogin ,Me.index);
router.post("/update",checkIsLogin,Me.updateUser);
module.exports  = router ;
