const express = require("express");

const PORT = 3001;
const server = express();
server.use(express.json())

const list = [
    {
        name: 'leche',
        cantidad: 3,
        precio: "1'20",
    },
    {
        name: 'carne',
        cantidad: 1,
        precio: '12',
    },
    {
        name: 'fruta',
        cantidad: 5,
        precio: '8',
    },
    {
        name: 'refresco',
        cantidad: 4,
        precio: "7'2",
    },
];


/*
method
GET--> READ leer información de la BBDD y devolverla al front
POST --> Crear datos en la BBDD, nuevos registros, envia informacion del front al back
PUT, PATCH -->  Modificar información en la BBDD 
DELETE --> Eliminar datos de la BBDD, 
*/
const routerUser = express.Router();
const routerProduct = express.Router();

routerUser.get("/listausuarios", (req, res) => {
    res.json({
        message: "todo correcto",
        success: true
    })
})
routerUser.get("/oneuser", (req, res) => {
    const user = {
        name: "anacleta",
        lastanme: "ruiz"
    }
    res.json({
        success: true,
        data: user
    })
})
routerUser.post("/adduser", (req, res) => {
    res.json({
        message: " registrado correctamente"
    })
})

routerProduct.get("/", (req, res) => {
    res.json({
        data: list
    })
})
// configura mi servidor con el bloque de rutas  routerUser
server.use("/user", routerUser)
server.use("/product", routerProduct)

server.listen(PORT, () => {
    console.log(`listen http://localhost:${PORT}`);
})
