const mongoose = require('mongoose');


const deportistas = new mongoose.Schema({
    id:{type:Number, require:true},
    claveDeportista: { type: String, required: true },
    idUsuario: { type: Number, required: true },
    posicion:{type:String,require: true},
    dorsal:{type:Number,require: true},
    direccion:{type:String,require: true},
    edad:{type:Number,require: true},
    estado:{type:Boolean,require: true},
    nombreAcudiente:{type:String,require: true},
    telefonoAcudiente:{type:String,require: true},
    correoAcudiente:{type:String,require: true},
    eps:{type:String,require: true}
});

module.exports=mongoose.model("deportistas", deportistas)