const mongoose = require('mongoose');


const entrenadores = new mongoose.Schema({
    id:{type:Number, require:true},
    idUsuario: { type: Number, required: true },
    categoria:{type:Number,require: true},
    eps:{type:String,require: true},
    salario:{type:Number,require: true},
    clave: { type: String, required: true }

});

module.exports=mongoose.model("entrenadores", entrenadores)