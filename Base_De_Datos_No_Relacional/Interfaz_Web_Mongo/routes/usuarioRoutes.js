const express = require("express");
const router = express.Router();
const Usuario = require("../models/usuarios");

// Consultar todos los usuarios
router.get("/", async(req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.json(usuarios);
    } catch(error) {
        res.status(500).json({error: error.message});
    }
});

// Buscar usuarios por término
router.get("/search/:term", async(req, res) => {
    try {
        const searchTerm = req.params.term;
        const usuarios = await Usuario.find({
            $or: [
                { id: isNaN(searchTerm) ? undefined : parseInt(searchTerm) },
                { nombre: { $regex: searchTerm, $options: 'i' } },
                { apellido: { $regex: searchTerm, $options: 'i' } },
                { correo: { $regex: searchTerm, $options: 'i' } },
                { telefono: { $regex: searchTerm, $options: 'i' } },
                { tipo: { $regex: searchTerm, $options: 'i' } }
            ].filter(Boolean)
        });
        res.json(usuarios);
    } catch(error) {
        res.status(500).json({error: error.message});
    }
});

// Consultar usuario por ID
router.get("/:id", async(req, res) => {
    try {
        const usuario = await Usuario.findOne({ id: req.params.id });
        if (!usuario) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        res.json(usuario);
    } catch(error) {
        res.status(500).json({error: error.message});
    }
});

// Crear nuevo usuario
router.post("/", async(req, res) => {
    try {
        const nuevoUsuario = new Usuario(req.body);
        const usuarioGuardado = await nuevoUsuario.save();
        res.status(201).json(usuarioGuardado);
    } catch(error) {
        res.status(500).json({error: error.message});
    }
});

// Actualizar usuario
router.put("/:id", async(req, res) => {
    try {
        const usuario = await Usuario.findOneAndUpdate(
            { id: req.params.id },
            req.body,
            { new: true, runValidators: true }
        );
        
        if (!usuario) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        
        res.json(usuario);
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
});

// Eliminar usuario
router.delete("/:id", async(req, res) => {
    try {
        const usuario = await Usuario.findOneAndDelete({ id: req.params.id });
        
        if (!usuario) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        
        res.json({ message: "Usuario eliminado correctamente", usuario });
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;