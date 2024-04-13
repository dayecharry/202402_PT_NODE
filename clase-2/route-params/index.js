const express = require('express');

const app = express();
app.use(express.json());
const PORT = 3000;

//endpoints--> Rutas , para hacer peticiones al servidor
//metodos --> get, post, put, delete
const dataStudents = ['ana', 'lucia', 'raquel', 'matias', 'anderson'];
const routerStudent = express.Router();

routerStudent.get('/students', (req, res) => {
  res.json({
    success: true,
    data: dataStudents,
  });
});
//url params
routerStudent.get('/student/:name/:name2', (req, res) => {
  //req.params  es un objeto  con los parámetros que se envian a atraves de la url

  console.log(req.params);
  const nameStudent = req.params.name;
  const name2 = req.params.name2;
  const filterStudent = dataStudents.filter(
    (item) => item.includes(nameStudent) || item.includes(name2)
  );
  res.json({
    data: filterStudent,
  });
});

// envies datos desde un form (body params)
routerStudent.post('/addstudent', (req, res) => {
  //req.body para recibir datos que vienen de un formulario en el cuerpo de la peticion
  console.log(req.body);
  dataStudents.push(req.body.name);
  res.json({
    message: 'Se añadio con exito',
    data: dataStudents,
  });
});

//query params (filtros, paginar datos, id)
routerStudent.get('/onestudent', (req, res) => {
  //http://localhost:3000/api/onestudent?id=1234
  //http://localhost:3000/api/onestudent?id=1&pag=2
  console.log(req.query);
  const position = req.query.id;

  const nombre = dataStudents[position];

  res.json({
    msg: 'todo correcto',
    data: nombre,
  });
});

app.use('/api', routerStudent);
app.listen(PORT, () => {
  console.log(` Te ha conectado  http://localhost:${PORT}`);
});
