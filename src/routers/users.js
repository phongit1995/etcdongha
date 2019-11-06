let express= require("express");
let UsersController = require("./../controllers/user");
let router = express.Router();

router.get("/", async (req,res)=>{
    res.send( await UsersController.GetInfoUser());
});
module.exports  = router ;
