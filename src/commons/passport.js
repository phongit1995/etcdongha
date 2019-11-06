let passport = require("passport");
let passportLocal = require("passport-local");
let {checkLogin,GetInfoUserById} = require('./../controllers/user');
let LocalStrategy = passportLocal.Strategy;
let initPassportLocal = ()=>{
    passport.use(new LocalStrategy({
        usernameField:"username",
        passwordField:"password",
        passReqToCallback:true
    }, async (req,username,password,done)=>{
        try{
            let user = await checkLogin(username,password);
            if(user.length>0){
                return done(null, user[0].dataValues.Id);
            }
            else{
                return done(null,false,req.flash("errors",'Sai tài khoản hoặc mật khẩu !'));
            }
           
        }
        catch(error){

        }
    }))
    passport.serializeUser((id,done)=>{
        done(null,id);
    })
    passport.deserializeUser( async (id,done)=>{
        let user = await GetInfoUserById(id);
        done(null,user[0].dataValues);
    })
}
module.exports = initPassportLocal;