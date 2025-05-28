const express = require("express");
const router = express.Router();
const Evento = require("../models/eventos");
const Usuario = require("../models/usuarios");

// Consultar todos los eventos
router.get("/", async(req, res) => {
    try {
        const eventos = await Evento.find();
        res.json(eventos);
    } catch(error) {
        res.status(500).json({error: error.message});
    }
});

// Buscar eventos por término
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
        
        // Buscar eventos
        const eventos = await Evento.find({
            $or: [
                { idUsuario: { $in: idsUsuarios } },
                { tipo: { $regex: searchTerm, $options: 'i' } },
                { descripcion: { $regex: searchTerm, $options: 'i' } },
                { idHorario: isNaN(searchTerm) ? undefined : parseInt(searchTerm) }
            ].filter(Boolean)
        });
        
        res.json(eventos);
    } catch(error) {
        res.status(500).json({error: error.message});
    }
});

// Consultar evento por ID
router.get("/:id", async(req, res) => {
    try {
        const evento = await Evento.findById(req.params.id);
        if (!evento) {
            return res.status(404).json({ error: "Evento no encontrado" });
        }
        res.json(evento);
    } catch(error) {
        res.status(500).json({error: error.message});
    }
});

// Crear nuevo evento
router.post("/", async(req, res) => {
    try {
        const nuevoEvento = new Evento(req.body);
        const eventoGuardado = await nuevoEvento.save();
        res.status(201).json(eventoGuardado);
    } catch(error) {
        res.status(500).json({error: error.message});
    }
});

// Actualizar evento
router.put("/:id", async(req, res) => {
    try {
        const evento = await Evento.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        
        if (!evento) {
            return res.status(404).json({ error: "Evento no encontrado" });
        }
        
        res.json(evento);
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
});

// Eliminar evento
router.delete("/:id", async(req, res) => {
    try {
        const evento = await Evento.findByIdAndDelete(req.params.id);
        
        if (!evento) {
            return res.status(404).json({ error: "Evento no encontrado" });
        }
        
        res.json({ message: "Evento eliminado correctamente", evento });
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;