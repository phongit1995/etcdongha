const Sequelize = require('sequelize');
const db = require("./connectdb");
const RateField = {
    IdRate:'IdRate',
    RateNumber:'RateNumber'
}
const  RateDB=  db.sequelize.define('Rate',{
    [RateField.IdRate]:{
        type:Sequelize.DataTypes.NUMBER,
        primaryKey:true,
        autoIncrement:true
    },
    [RateField.RateNumber]:{
        type:Sequelize.DataTypes.NUMBER
    }
})
module.exports = {
    RateField, RateDB
}