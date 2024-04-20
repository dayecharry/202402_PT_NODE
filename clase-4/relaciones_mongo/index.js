//import de dependecias y archivos
const express = require('express');
const { connectDB } = require('./src/utils/database');
const routerPet = require('./src/api/routes/pet.routes');
const routerUser = require('./src/api/routes/user.routes');
// configuración del servidor
const server = express();
server.use(express.json());
connectDB();

// configuro el servidor con las rutas
server.use('/', routerPet);
server.use('/user', routerUser);

//ejecucion del servidor
const PORT = 5001;
server.listen(PORT, () => {
  console.log(`Escuchando puerto http://localhost:${PORT}`);
});
