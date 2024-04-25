//import de dependecias y archivos
const express = require('express');
const { connectDB } = require('./src/utils/database');
const routerUser = require('./src/api/routes/user.routes');
const env = require("dotenv")
env.config() // para trabajar con variables de entorno
// configuración del servidor
const server = express();
server.use(express.json());
connectDB();

server.use('/user', routerUser);

//ejecucion del servidor
const PORT = 5001;
server.listen(PORT, () => {
  console.log(`Escuchando puerto http://localhost:${PORT}`);
});
