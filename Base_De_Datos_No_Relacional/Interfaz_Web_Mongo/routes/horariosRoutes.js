const express = require("express");
const router = express.Router();
const Horario = require("../models/horarios");

// Consultar todos los horarios
router.get("/", async(req, res) => {
    try {
        const horarios = await Horario.find();
        res.json(horarios);
    } catch(error) {
        res.status(500).json({error: error.message});
    }
});

// Buscar horarios por término
router.get("/search/:term", async(req, res) => {
    try {
        const searchTerm = req.params.term;
        
        const horarios = await Horario.find({
            $or: [
                { fecha: { $regex: searchTerm, $options: 'i' } },
                { hora: { $regex: searchTerm, $options: 'i' } },
                { lugar: { $regex: searchTerm, $options: 'i' } }
            ]
        });
        
        res.json(horarios);
    } catch(error) {
        res.status(500).json({error: error.message});
    }
});

// Consultar horario por ID
router.get("/:id", async(req, res) => {
    try {
        const horario = await Horario.findById(req.params.id);
        if (!horario) {
            return res.status(404).json({ error: "Horario no encontrado" });
        }
        res.json(horario);
    } catch(error) {
        res.status(500).json({error: error.message});
    }
});

// Crear nuevo horario
router.post("/", async(req, res) => {
    try {
        const nuevoHorario = new Horario(req.body);
        const horarioGuardado = await nuevoHorario.save();
        res.status(201).json(horarioGuardado);
    } catch(error) {
        res.status(500).json({error: error.message});
    }
});

// Actualizar horario
router.put("/:id", async(req, res) => {
    try {
        const horario = await Horario.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        
        if (!horario) {
            return res.status(404).json({ error: "Horario no encontrado" });
        }
        
        res.json(horario);
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
});

// Eliminar horario
router.delete("/:id", async(req, res) => {
    try {
        const horario = await Horario.findByIdAndDelete(req.params.id);
        
        if (!horario) {
            return res.status(404).json({ error: "Horario no encontrado" });
        }
        
        res.json({ message: "Horario eliminado correctamente", horario });
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;