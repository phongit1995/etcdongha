const Sequelize = require('sequelize');
const db = require("./connectdb");
const TrackFields = {
    Id:'Id',
    LicensePlates:'LicensePlates', // Biển Số Xe
    NameCustomer:'NameCustomer', // Tên Khách Hàng
    Lane:'Lane', // Lane
    TrackTime:'TrackTime', // Thời Gian 
    CreateByUser:'CreateByUser', // Người Tạo
    Image:'Image', // Hình Ảnh
    TrackRate:'TrackRate', // Rate
    Status:'Status', // Trạng Thái
    Notes:'Notes' // Notes
}
const TrackDB = db.sequelize.define('Track',{
    [TrackFields.Id]:{
        type:Sequelize.DataTypes.CHAR,
        primaryKey:true
    },
    [TrackFields.LicensePlates]:{
        type:Sequelize.DataTypes.STRING
    },
    [TrackFields.NameCustomer]:{
        type:Sequelize.DataTypes.STRING
    },
    [TrackFields.Lane]:{
        type:Sequelize.DataTypes.STRING
    },
    [TrackFields.TrackTime]: {
        type:Sequelize.TIME
    },
    [TrackFields.CreateByUser]:{
        type:Sequelize.DataTypes.STRING
    },
    [TrackFields.Image]:{
        type:Sequelize.DataTypes.STRING
    },
    [TrackFields.TrackRate]:{
        type:Sequelize.NUMBER
    },
    [TrackFields.Status]:{
        type:Sequelize.BOOLEAN,
        defaultValue:true
    },
    [TrackFields.Notes]:{
        type:Sequelize.TEXT,
        set(val){
            this.setDataValue(TrackField.Notes,JSON.stringify(val))
        },
        get(){
            if (this.getDataValue(TrackFields.Notes)) {
                return JSON.parse(this.getDataValue(TrackField.Notes));
            }
        }
    }
    
})
module.exports ={
    TrackFields , TrackDB
}
