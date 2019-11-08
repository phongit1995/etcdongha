let ResponseHelper = require('./../commons/ResponseHelper');
let moment = require('moment-timezone');
let {getListDescriptor} = require('./../models/Descriptor');
let {getListhandleerror} = require('./../models/handleerror');
let {getListLane} = require('./../models/lane');
let OperatingDiaryController = require('./../models/operatingdiary');
let index = async (req,res)=>{
    let {Group,Role} = req.user ;
    let [ListDescriptor,Listhandleerror,ListLane,ListOperatingDary] = await Promise.all([getListDescriptor(),getListhandleerror(),getListLane(),OperatingDiaryController.getListOperationgDiary(Role,Group)]);
    console.log(JSON.parse(JSON.stringify(ListOperatingDary)));
    res.render('clients/operatingdiary/index',{
        user:req.user,
        ListDescriptor:JSON.parse(JSON.stringify(ListDescriptor)),
        Listhandleerror:JSON.parse(JSON.stringify(Listhandleerror)),
        ListLane:JSON.parse(JSON.stringify(ListLane)),
        ListOperatingDary:JSON.parse(JSON.stringify(ListOperatingDary[0])),
        moment:moment
    })
}
let create = async (req,res)=>{
    try {
        console.log(req.body);
        let result = await OperatingDiaryController.create(req.body,req.user.Id,req.file);
        ResponseHelper.json(res,null,result);
    } catch (error) {
        ResponseHelper.json(res,'Lỗi',null);
    }
} 
module.exports = {
    index,create
}