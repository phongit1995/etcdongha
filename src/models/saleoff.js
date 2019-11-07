let {SaleOffFields,SaleOffDB} = require('./../databases/saleoff');
let Texthelper = require('./../commons/TextHelper');
let sequelize = require('./../databases/connectdb');
let moment = require('moment-timezone');
let create = async (data,IdUser,Image)=>{
    delete data.FileImages;
    data[SaleOffFields.CreateByUser] = IdUser;
    data[SaleOffFields.SaleOffID]= Texthelper.genId();
    if(Image){
        data[SaleOffFields.Image] = Image.filename ;
    }
    // console.log(data);
    let result = await SaleOffDB.create({...data});
    return result ;
}
let GetListSaleOff = async (Role,Group)=>{
    let Sql= `select SaleOff.SaleOffID ,SaleOff.LicensePlates, SaleOff.NameCustomer, SaleOff.CreateByUser , SaleOff.
        Image , SaleOff.DateStart , SaleOff.DateEnd, SaleOff.Notes, TypeOfSaleOff.TypeOfSaleOffID , TypeOfSaleOff.TypeOfSaleOffName, Denominations.DenominationsID , Denominations.DenominationsNumbers, Users.UserName,Users.Id from SaleOff  LEFT JOIN TypeOfSaleOff on SaleOff.TypeOfSaleOff = TypeOfSaleOff.TypeOfSaleOffID LEFT JOIN Users on SaleOff.CreateByUser = Users.Id LEFT JOIN 
        Denominations on SaleOff.Denominations = Denominations.DenominationsID where SaleOff.Status =1`
        if(Role!=1){
            Sql+= ` and Users.Group= ${Group}`
        }
        Sql+= ` ORDER  BY SaleOff.createdAt DESC` ;
        return await sequelize.query(Sql) ;
}
let deleteSaleoff = async (data,IdUser)=>{
    let SaleoffList = await SaleOffDB.findAll({
        where:{
            [SaleOffFields.SaleOffID]:data.SaleOffId
        }
    })
    let NotesAdmin= SaleoffList[0].dataValues[SaleOffFields.NotesAdmin] ;
    let Note ={ type:'Delete',UserId:IdUser,Time:moment().tz("Asia/Bangkok").format("DD-MM-YYYY HH:mm")};
    if(!NotesAdmin){ NotesAdmin=[] ; NotesAdmin.push(Note) }else{
        NotesAdmin= JSON.parse(NotesAdmin);
        NotesAdmin.push(Note)
    }
    let result = await SaleOffDB.update({
        [SaleOffFields.Status]:false,
        [SaleOffFields.NotesAdmin]:NotesAdmin
    },{
        where:{
            [SaleOffFields.SaleOffID]:data.SaleOffId
        }
    })
    return result ;
}
let GetInfoSaleOff = async (Id)=>{
    let SaleOffList = await SaleOffDB.findAll({
        where:{
            [SaleOffFields.SaleOffID]:Id
        }
    })
    return SaleOffList[0];
}
module.exports= {
    create ,GetListSaleOff ,deleteSaleoff,GetInfoSaleOff
}