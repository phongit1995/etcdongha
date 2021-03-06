let express= require("express");
let UsersController = require("./../controllers/user");
let router = express.Router();
let {checkIsLogin} = require('./../commons/checkPermisson');
let trackController = require('./../controllers/track');
router.get("/", checkIsLogin,trackController.index);
router.post("/create",checkIsLogin,trackController.create);
router.get("/getList",checkIsLogin,trackController.getListTrack);
router.post('/delete',checkIsLogin,trackController.DeleteTrack);
router.post('/getInfo',checkIsLogin,trackController.GetInfo);
router.post('/update',checkIsLogin,trackController.update);
router.post('/search',checkIsLogin,trackController.search);
router.post('/suggest',checkIsLogin,trackController.suggest);
module.exports  = router ;
