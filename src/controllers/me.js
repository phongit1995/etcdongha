let groupsModels = require('./../models/group');
let UserModels = require('./../models/users');
let index = async (req,res)=>{
    let users = await UserModels.getUserById(req.user.Id);
    
    let userInfo = users[0].dataValues;
    let {Group} = req.user;
    let groups = await groupsModels.GetInfoGroups(Group);
    userInfo.GroupName= groups.dataValues.GroupName ;
    let infoGroup = await UserModels.getListUserInGroup(Group);
    userInfo.groups = infoGroup ;
    console.log(userInfo);
    res.render('clients/me/index',{user:userInfo});
}
let updateUser = async (req,res)=>{
    console.log(req.body);
    let {Id} = req.user;
    let User = await UserModels.UpdateUser(Id,req.body);
    return res.json({error:null})
}
let updateImage = async (req,res)=>{
    let {Id} = req.user;
    let users = await UserModels.UpdateUser(Id,{Avatar:req.file.filename});
    console.log(req.file);
}
module.exports = {
    index,updateUser,updateImage
}