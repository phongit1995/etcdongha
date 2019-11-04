let express = require("express");
let app = express();
app.get("/",(req,res)=>{
    res.send("phong");
})
app.listen(8000,()=>{
    console.log("kết nối thành công");
});