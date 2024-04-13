const express = require('express');
const { add } = require('../controllers/student.controller');

const routerStudent = express.Router();

routerStudent.post('/addstudent', add);

module.exports = routerStudent;
