let express= require("express");
let router = express.Router();
let passport = require("passport");
let users = require("./users") ;
let Track = require('./track');
let SaleOff = require('./saleoff');
let Groups = require('./group');
let OperatingDiary = require('./operatingdiary');
let {checkIsLogin} = require('./../commons/checkPermisson');


router.get("/",checkIsLogin,(req,res)=>{
    console.log(req.user);
    res.render('clients/index',{user:req.user});
})
router.get("/login",(req,res,next)=>{
    if(!req.isAuthenticated()){
        return next();
   }
   return res.redirect("/");
    }
    ,(req,res)=>{
        res.render('clients/login',{error:null});
})
router.get("/logout",checkIsLogin,(req,res)=>{ // Đăng Xuât
    req.logout();
    res.redirect("/");
})
router.post('/login', passport.authenticate('local', { successRedirect: '/',
failureRedirect: '/login' }));
// User others router
router.use("/users" ,users); // User Router
router.use("/track",Track); // Track Router
router.use("/saleoff",SaleOff); // Sale Off Router
router.use("/operatingdiary",OperatingDiary);
router.use("/groups",Groups);
module.exports  = router ;
