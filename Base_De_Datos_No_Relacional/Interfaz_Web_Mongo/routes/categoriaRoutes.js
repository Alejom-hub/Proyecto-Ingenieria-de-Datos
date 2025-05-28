const express=require("express")
const router=express.Router();
const Categoria= require("../models/categoria")

//Registrar un item
router.post("/", async(req,res)=>{
    
try{
const item = new Categoria(req.body);
await item.save();

    res.status(201).json(item);


}catch(error){
    res.status(400).json({error:error.message})
}
});

//Consultar todos los items
router.get("/", async(req,res)=>{

try{
    const item = await Categoria.find();
    res.json(item);


}catch(error){
    res.status(500).json({error:error.message})
}

});

//Consultar item por id
router.get("/:id", async(req,res)=>{

try{
    const item = await Categoria.findById(req.params.id);
    if (!item ) return res.status(404).json({error : "item No Encontrado"})
    res.json(item);


}catch(error){
    res.status(500).json({error:error.message})
}

});

//modificar datos del item

router.put("/:id", async(req,res)=>{

try{
    const item = await Categoria.findByIdAndUpdate(req.params.id, req.body, {new:true});
    if (!item ) return res.status(404).json({error : "item No Encontrado"})
    res.json(item);


}catch(error){
    res.status(500).json({error:error.message})
}

});

//eliminar un item
router.delete("/:id", async(req,res)=>{

try{
    const item = await Categoria.findByIdAndDelete(req.params.id);
    if (!item ) return res.status(404).json({error : "item No Encontrado"})
    res.json(item);


}catch(error){
    res.status(500).json({error:error.message})
}

});



// Consultar todas las categorías
router.get("/", async(req, res) => {
    try {
        const categorias = await Categoria.find();
        res.json(categorias);
    } catch(error) {
        res.status(500).json({error: error.message});
    }
});


module.exports=router;