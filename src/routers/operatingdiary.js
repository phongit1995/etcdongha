let express= require("express");
let router = express.Router();
let {checkIsLogin} = require('./../commons/checkPermisson');
let path = require('path');
let multer  = require('multer');
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'../public/images/operatingdiaryimages'));
    },
    filename: function (req, file, cb) {
      cb(null, req.user.Id+'-' + Date.now()+'-'+ file.originalname);
    }
})
let upload = multer({ storage: storage })
let OperatingDiaryController = require('./../controllers/operatingdiary');
router.get('/',checkIsLogin,OperatingDiaryController.index);
router.post('/create',checkIsLogin,upload.single('FileImages'),OperatingDiaryController.create)
module.exports = router ;