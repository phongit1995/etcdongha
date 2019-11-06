let genId = () =>{
    var id = Math.floor(Math.random() * 1000000) + '' + Math.floor(Math.random() * 1000000);
    return id;
}
module.exports = {
    genId
}