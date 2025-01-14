const express = require('express');
const projectsRouter = require('./projects');
const skillsRouter = require('./skills');
const app = express();
const cors = require('cors');

// Configuración de CORS para DESARROLLO (permite localhost:5173)
const corsOptions = {
    origin: '*', // Permite todos los orígenes
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Si necesitas cookies (con implicaciones de seguridad, ver abajo)
    optionsSuccessStatus: 204
};
app.use(cors(corsOptions));

// Rutas
app.get('/', (req, res) => {
  res.json({ message: 'Hola Mundo!' });
});

app.get('/patatas', (req, res) => {
  res.send('Hola Mundo desde Patatas!');
});

app.use('/projects', projectsRouter);
app.use('/skills', require('./skills'));

// Para despliegues locales (opcional)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

// Para Vercel (IMPORTANTE)
module.exports = app;