const mongoose = require('mongoose');


const usuarios = new mongoose.Schema({
    id:{type:Number, require:true},
    tipo: { type: String, required: true },
    nombre:{type:String,require: true}
});

module.exports=mongoose.model("usuarios", usuarios)