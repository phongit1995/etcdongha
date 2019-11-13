let express= require("express");
let {checkIsLogin,CheckIsSuperAdmin,checkIsAdmin} = require('./../commons/checkPermisson');
let router = express.Router();
let UserController = require('./../controllers/user');

router.get("/" ,checkIsLogin,checkIsAdmin,UserController.index);
module.exports  = router ;
