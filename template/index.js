//import de dependecias y archivos
const express = require('express');
const { connectDB } = require('./src/utils/database');

// configuración del servidor
const server = express();
server.use(express.json());
connectDB();

//ejecucion del servidor
const PORT = 5001;
server.listen(PORT, () => {
  console.log(`Escuchando puerto http://localhost:${PORT}`);
});
