const mongoose = require('mongoose');


const administradores = new mongoose.Schema({
    correo:{type:String,require: true},
    clave: {type:String,require: true}
});

module.exports=mongoose.model("administradores", administradores)