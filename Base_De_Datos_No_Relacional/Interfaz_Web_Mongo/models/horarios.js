const mongoose = require('mongoose');


const horarios = new mongoose.Schema({
    id:{type:Number, require:true},
    fecha: { type: Date, required: true},
    hora:{type:String,require: true},
    lugar:{type:String,require: true}
});

module.exports=mongoose.model("horarios", horarios)