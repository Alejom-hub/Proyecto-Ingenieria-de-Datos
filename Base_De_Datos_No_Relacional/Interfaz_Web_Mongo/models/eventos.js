const mongoose = require('mongoose');


const eventos = new mongoose.Schema({
    id:{type:Number, require:true},
    idUsuario: { type: Number, required: true },
    tipo:{type:String,require: true},
    descripcion:{type:String,require: true},
    idHorario:{type:String,require: true}
});

module.exports=mongoose.model("eventos", eventos)