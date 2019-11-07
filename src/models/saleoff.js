let {SaleOffFields,SaleOffDB} = require('./../databases/saleoff');
let Texthelper = require('./../commons/TextHelper');
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
module.exports= {
    create 
}