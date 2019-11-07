let ResponseHelper = require('./../commons/ResponseHelper');
let moment = require('moment-timezone');
let  {GetListDenomintations} = require('./../models/denominations');
let {getListTypeOffSaleOff} = require('./../models/typeoffsaleoff');
let SaleOffModel= require('./../models/saleoff');
let index = async (req,res)=>{
    let {Group,Role} = req.user ;
    let listDenomintations = await GetListDenomintations();
    let listTypeOffSaleOff = await getListTypeOffSaleOff();
    res.render('clients/saleoff/index',{user:req.user,listDenomintations:JSON.parse(JSON.stringify(listDenomintations)),
        listTypeOffSaleOff:JSON.parse(JSON.stringify(listTypeOffSaleOff)) , moment:moment})
}
let create = async (req,res)=>{
    try{
        // console.log(req.body ,req.file);
        let result = await  SaleOffModel.create(req.body,req.user.Id,req.file);
       ResponseHelper.json(res,null,result);
    }
    catch(error){
        ResponseHelper.json(res,'Lỗi',null);
    }
   
}
module.exports = {
    index,create
}