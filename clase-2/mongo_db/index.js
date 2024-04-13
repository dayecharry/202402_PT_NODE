//import de dependecias y archivos
const express = require('express');
const { connectDB } = require('./src/utils/database');
const routerStudent = require('./src/api/routes/student.routes');

// configuración del servidor
const server = express();
server.use(express.json());
connectDB();

// configuro el servidro con las rutas
server.use('/student', routerStudent);
//ejecucion del servidor
const PORT = 5001;
server.listen(PORT, () => {
  console.log(`Escuchando puerto http://localhost:${PORT}`);
});
