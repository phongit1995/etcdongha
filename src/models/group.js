let {GroupUsersDB,GroupUsersFields} = require('./../databases/GroupUsers');
let getList = async ()=>{
    let result = await GroupUsersDB.findAll();
    return result ;
}
let createGroup = async (nameGroup)=>{
    let result = await GroupUsersDB.create({
        [GroupUsersFields.GroupName]:nameGroup
    })
    return result ;
}
module.exports = {
    getList,createGroup
}