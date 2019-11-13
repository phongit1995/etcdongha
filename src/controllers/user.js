let UsersModel = require('../databases/users');
let createUser = (userinfo)=>{
    
}
let GetInfoUser =  async ()=>{
        return await UsersModel.UsersDB.findAll();
}
let checkLogin = async (username,password)=>{
    let User = await UsersModel.UsersDB.findAll({
        where:{
            [UsersModel.UsersField.UserName]:username,
            [UsersModel.UsersField.Password]:password
        }
    })
    return User;
}
let GetInfoUserById = async (ID)=>{
    let User = await UsersModel.UsersDB.findAll({
        where:{
            [UsersModel.UsersField.Id]:ID
        }
    })
    return User;
}
let index = async (req,res)=>{
    res.render('clients/users/index',{user:req.user});
}
module.exports ={
    createUser,GetInfoUser,checkLogin,GetInfoUserById,index
}