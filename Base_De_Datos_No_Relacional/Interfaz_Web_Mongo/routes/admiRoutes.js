const express=require("express")
const router=express.Router();
const Administador= require("../models/administradores")

//Registrar un administrador
router.post("/", async(req,res)=>{
    
try{
const administrador = new Administador(req.body);
await administrador.save();

    res.status(201).json(administrador);


}catch(error){
    res.status(400).json({error:error.message})
}
});

//Consultar todos los administradors
router.get("/", async(req,res)=>{

try{
    const administrador = await Administador.find();
    res.json(administrador);


}catch(error){
    res.status(500).json({error:error.message})
}

});



//Consultar administrador por id
router.get("/:id", async(req,res)=>{

try{
    const administrador = await Administador.findById(req.params.id);
    if (!administrador ) return res.status(404).json({error : "administrador No Encontrado"})
    res.json(administrador);


}catch(error){
    res.status(500).json({error:error.message})
}

});

//modificar datos del administrador

router.put("/:id", async(req,res)=>{

try{
    const administrador = await Administador.findByIdAndUpdate(req.params.id, req.body, {new:true});
    if (!administrador ) return res.status(404).json({error : "administrador No Encontrado"})
    res.json(administrador);


}catch(error){
    res.status(500).json({error:error.message})
}

});

//eliminar un administrador
router.delete("/:id", async(req,res)=>{

try{
    const administrador = await Administador.findByIdAndDelete(req.params.id);
    if (!administrador ) return res.status(404).json({error : "administrador No Encontrado"})
    res.json(administrador);


}catch(error){
    res.status(500).json({error:error.message})
}

});



module.exports=router;