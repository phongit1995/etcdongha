let express= require("express");
let router = express.Router();
let SaleOffController = require('./../controllers/saleoff');
let {checkIsLogin} = require('./../commons/checkPermisson');
let path = require('path');
let multer  = require('multer');
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'../public/images/saleoffimages'));
    },
    filename: function (req, file, cb) {
      cb(null, req.user.Id+'-' + Date.now()+'-'+ file.originalname);
    }
})
let upload = multer({ storage: storage })

router.get('/',checkIsLogin, SaleOffController.index);
router.post('/create',checkIsLogin, upload.single('FileImages'),SaleOffController.create);
module.exports  = router ;
