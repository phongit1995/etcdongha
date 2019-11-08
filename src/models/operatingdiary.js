let {OperatingDiaryFileds,OperatingDiaryDB} = require('./../databases/operatingdiary');
let Texthelper = require('./../commons/TextHelper');
let sequelize = require('./../databases/connectdb');
let moment = require('moment-timezone');
let create = async (data,IdUser,Image)=>{
    delete data.FileImages;
    data[OperatingDiaryFileds.CreateByUser]= IdUser ;
    data[OperatingDiaryFileds.OperatingDiaryId] =Texthelper.genId();
    if(Image){
        data[OperatingDiaryFileds.Image]= Image.filename;
    }
    console.log(data);
    let result = await OperatingDiaryDB.create({...data});
    return result ;
}
let getListOperationgDiary = async (Role,Group)=>{
    let Sql = `
    select OperatingDiary.OperatingDiaryId , OperatingDiary.LicensePlates, OperatingDiary.OperatingDiaryTime, OperatingDiary.Lane,OperatingDiary.Image,OperatingDiary.Descriptor,OperatingDiary.Handle,OperatingDiary.Status ,OperatingDiary.Notes , OperatingDiary.NotesAdmin
    ,Lane.LaneName , HandleError.HandleErrorContent, Descriptor.DescriptorContent, Users.Id , Users.UserName 
    from OperatingDiary LEFT JOIN Lane on  OperatingDiary.Lane = Lane.LaneID left join Descriptor on OperatingDiary.
    Descriptor = Descriptor.DescriptorId left join HandleError on OperatingDiary.Handle = HandleError.HandleErrorId left join Users on 
    OperatingDiary.CreateByUser = Users.Id where Status =1
    `
    if(Role!=1){
        Sql+= ` and Users.Group= ${Group}`
    }
    Sql+= ` ORDER  BY OperatingDiary.createdAt DESC` ;
    return await sequelize.query(Sql) ;
}
module.exports = {
    create,getListOperationgDiary
}