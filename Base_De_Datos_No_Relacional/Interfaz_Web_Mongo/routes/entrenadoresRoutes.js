const express = require("express");
const router = express.Router();
const Entrenador = require("../models/entrenadores");
const Usuario = require("../models/usuarios");

// Consultar todos los entrenadores
router.get("/", async(req, res) => {
    try {
        const entrenadores = await Entrenador.find();
        res.json(entrenadores);
    } catch(error) {
        res.status(500).json({error: error.message});
    }
});

// Buscar entrenadores por término
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
        
        // Buscar entrenadores por ID o por usuario
        const entrenadores = await Entrenador.find({
            $or: [
                { id: isNaN(searchTerm) ? undefined : parseInt(searchTerm) },
                { idUsuario: { $in: idsUsuarios } },
                { categoria: { $regex: searchTerm, $options: 'i' } },
                { eps: { $regex: searchTerm, $options: 'i' } },
                { salario: isNaN(searchTerm) ? undefined : parseInt(searchTerm) }
            ].filter(Boolean)
        });
        
        res.json(entrenadores);
    } catch(error) {
        res.status(500).json({error: error.message});
    }
});

// Consultar entrenador por ID
router.get("/:id", async(req, res) => {
    try {
        const entrenador = await Entrenador.findOne({ id: req.params.id });
        if (!entrenador) {
            return res.status(404).json({ error: "Entrenador no encontrado" });
        }
        res.json(entrenador);
    } catch(error) {
        res.status(500).json({error: error.message});
    }
});

// Crear nuevo entrenador
router.post("/", async(req, res) => {
    try {
        const nuevoEntrenador = new Entrenador(req.body);
        const entrenadorGuardado = await nuevoEntrenador.save();
        res.status(201).json(entrenadorGuardado);
    } catch(error) {
        res.status(500).json({error: error.message});
    }
});

// Actualizar entrenador
router.put("/:id", async(req, res) => {
    try {
        const entrenador = await Entrenador.findOneAndUpdate(
            { id: req.params.id },
            req.body,
            { new: true, runValidators: true }
        );
        
        if (!entrenador) {
            return res.status(404).json({ error: "Entrenador no encontrado" });
        }
        
        res.json(entrenador);
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
});

// Eliminar entrenador
router.delete("/:id", async(req, res) => {
    try {
        const entrenador = await Entrenador.findOneAndDelete({ id: req.params.id });
        
        if (!entrenador) {
            return res.status(404).json({ error: "Entrenador no encontrado" });
        }
        
        res.json({ message: "Entrenador eliminado correctamente", entrenador });
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;