const Sequelize = require('sequelize');
const db = require("./connectdb");
const TypeOfSaleOffFields = {
    TypeOfSaleOffID:'TypeOfSaleOffID',
    TypeOfSaleOffName:'TypeOfSaleOffName'
}
const  TypeOfSaleOffDB=  db.define('TypeOfSaleOff',{
    [TypeOfSaleOffFields.TypeOfSaleOffID]:{
        type:Sequelize.DataTypes.NUMBER,
        primaryKey:true,
        autoIncrement:true
    },
    [TypeOfSaleOffFields.TypeOfSaleOffName]:{
        type:Sequelize.DataTypes.STRING
    }
})
module.exports = {
    TypeOfSaleOffFields, TypeOfSaleOffDB
}