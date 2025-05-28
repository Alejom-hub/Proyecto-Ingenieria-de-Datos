const Administrador = require('../models/administradores');

const login = async (req, res) => {
    try {
        console.log('Datos recibidos:', req.body);
        const { usuario, clave } = req.body;

        // Buscar solo en administradores (por correo)
        const usuarioEncontrado = await Administrador.findOne({ 
            correo: usuario, 
            clave: clave 
        });

        if (usuarioEncontrado) {
            console.log('Administrador encontrado:', usuarioEncontrado);
            res.json({
                success: true,
                message: 'Login exitoso',
                usuario: {
                    id: usuarioEncontrado._id,
                    correo: usuarioEncontrado.correo
                }
            });
        } else {
            res.status(401).json({
                success: false,
                message: 'Credenciales incorrectas'
            });
        }

    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({
            success: false,
            message: 'Error en el servidor',
            error: error.message
        });
    }
};

module.exports = { login };