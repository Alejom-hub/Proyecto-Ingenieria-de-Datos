const express = require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const cors=require('cors');
const path = require('path'); // ← AGREGAR ESTA LÍNEA

//Importar las rutas
const usuarioRoutes=require('./routes/usuarioRoutes');
const administadorRoutes = require('./routes/admiRoutes');
const deportistasRoutes=require('./routes/deportistasRoutes');
const entrenadoresRoutes=require('./routes/entrenadoresRoutes');
const horariosRoutes = require('./routes/horariosRoutes');
const eventosRoutes=require('./routes/eventosRoutes');
const categoriaRoutes=require('./routes/categoriaRoutes');
const authRoutes = require('./routes/authRoutes');


const app=express();
const port=3000;


//Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'frontend'))); // ← AGREGAR ESTA LÍNEA


//Conexion Mongo
mongoose.connect('mongodb+srv://daviiidmonttlynx:adminlynx@clusterlynx.93gdejn.mongodb.net/Lynx',
    {useNewUrlParser:true,
    useUnifiedTopology:true,
})
.then(()=>console.log("MongoDB Atlas Conectado"))
.catch(err=>console.error(err));

// Rutas de API
app.use('/api/administrador', administadorRoutes);
app.use('/api/deportistas', deportistasRoutes);
app.use('/api/entrenadores', entrenadoresRoutes);
app.use('/api/horarios', horariosRoutes);
app.use('/api/eventos', eventosRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/categorias', categoriaRoutes);
app.use('/api/auth', authRoutes);

// Rutas para servir páginas HTML ← AGREGAR ESTAS 8 LÍNEAS
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'login.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});




// iniciarlizar servior
app.listen(port,()=>{
    console.log(`Servidor corriendo sobre http://localhost:${port}`)
});