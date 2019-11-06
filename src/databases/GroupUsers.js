const Sequelize = require('sequelize');
const db = require("./connectdb");
const GroupUsersFields = {
    GroupID:'GroupID',
    GroupName:'GroupName'
}
const  GroupUsersDB=  db.define('GroupUsers',{
    [GroupUsersFields.GroupID]:{
        type:Sequelize.DataTypes.NUMBER,
        primaryKey:true,
        autoIncrement:true
    },
    [GroupUsersFields.GroupName]:{
        type:Sequelize.DataTypes.STRING
    }
})
module.exports = {
    GroupUsersFields, GroupUsersDB
}