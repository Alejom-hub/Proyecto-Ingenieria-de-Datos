const mongoose = require('mongoose');


const categorias = new mongoose.Schema({
    id:{type:Number, require:true},
    nombre: {type: String, required: true }
});

module.exports=mongoose.model("categoria", categorias)