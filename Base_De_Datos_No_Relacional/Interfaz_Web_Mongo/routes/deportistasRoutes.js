const express = require("express");
const router = express.Router();
const Deportista = require("../models/deportistas");
const Usuario = require("../models/usuarios");

// Consultar todos los deportistas
router.get("/", async(req, res) => {
    try {
        const deportistas = await Deportista.find();
        res.json(deportistas);
    } catch(error) {
        res.status(500).json({error: error.message});
    }
});

// Buscar deportistas por término
router.get("/search/:term", async(req, res) => {
    try {
        const searchTerm = req.params.term;
        
        // Buscar usuarios que coincidan con el término
        const usuariosCoincidentes = await Usuario.find({
            $or: [
                { nombre: { $regex: searchTerm, $options: 'i' } },
                { apellido: { $regex: searchTerm, $options: 'i' } },
                { correo: { $regex: searchTerm, $options: 'i' } }
            ]
        });
        
        const idsUsuarios = usuariosCoincidentes.map(u => u.id);
        
        // Buscar deportistas por ID o por usuario
        const deportistas = await Deportista.find({
            $or: [
                { id: isNaN(searchTerm) ? undefined : parseInt(searchTerm) },
                { idUsuario: { $in: idsUsuarios } },
                { posicion: { $regex: searchTerm, $options: 'i' } },
                { dorsal: isNaN(searchTerm) ? undefined : parseInt(searchTerm) },
                { eps: { $regex: searchTerm, $options: 'i' } },
                { nombreAcudiente: { $regex: searchTerm, $options: 'i' } }
            ].filter(Boolean)
        });
        
        res.json(deportistas);
    } catch(error) {
        res.status(500).json({error: error.message});
    }
});

// Consultar deportista por ID
router.get("/:id", async(req, res) => {
    try {
        const deportista = await Deportista.findOne({ id: req.params.id });
        if (!deportista) {
            return res.status(404).json({ error: "Deportista no encontrado" });
        }
        res.json(deportista);
    } catch(error) {
        res.status(500).json({error: error.message});
    }
});

// Crear nuevo deportista
router.post("/", async(req, res) => {
    try {
        const nuevoDeportista = new Deportista(req.body);
        const deportistaGuardado = await nuevoDeportista.save();
        res.status(201).json(deportistaGuardado);
    } catch(error) {
        res.status(500).json({error: error.message});
    }
});

// Actualizar deportista
router.put("/:id", async(req, res) => {
    try {
        const deportista = await Deportista.findOneAndUpdate(
            { id: req.params.id },
            req.body,
            { new: true, runValidators: true }
        );
        
        if (!deportista) {
            return res.status(404).json({ error: "Deportista no encontrado" });
        }
        
        res.json(deportista);
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
});

// Eliminar deportista
router.delete("/:id", async(req, res) => {
    try {
        const deportista = await Deportista.findOneAndDelete({ id: req.params.id });
        
        if (!deportista) {
            return res.status(404).json({ error: "Deportista no encontrado" });
        }
        
        res.json({ message: "Deportista eliminado correctamente", deportista });
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;