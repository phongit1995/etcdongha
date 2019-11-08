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
module.exports ={
    createUser,GetInfoUser,checkLogin,GetInfoUserById
}