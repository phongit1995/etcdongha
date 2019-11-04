const Sequelize = require('sequelize');
const db = require("./connectdb");
const UsersField = {
    Id:'Id',
    UserName:'UserName',
    Password:'Password',
    Email:'Email',
    Role:'Role',
    Group:'Group'
}
const UsersRole = {
    ADMIN:1,
    MANAGER:2,
    MEMBER:3
}
const UsersDB=  db.sequelize.define('Users',{
    [UsersField.Id]:{
        type:Sequelize.DataTypes.CHAR,
        primaryKey:true
    },
    [UsersField.UserName]:{
        type:Sequelize.DataTypes.STRING 
    },
    [UsersField.Password]:{
        type:Sequelize.DataTypes.STRING 
    },
    [UsersField.Email]:{
        type:Sequelize.DataTypes.STRING 
    },
    [UsersField.Role]:{
        type:Sequelize.DataTypes.NUMBER
    },
    [UsersField.Group]:{
        type:Sequelize.DataTypes.NUMBER
    }
})
module.exports = {
    UsersDB,
    UsersRole,
    UsersField
}