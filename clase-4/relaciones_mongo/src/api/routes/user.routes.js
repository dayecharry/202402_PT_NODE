const express = require('express');
const router = express.Router();
const {
  addUser,
  selectUser,
  updateUser,
} = require('../controllers/user.controller');

const { addDoctor } = require('../controllers/doctor.controller');

router.post('/add', addUser);
router.get('/select', selectUser);
router.put('/update/:id', updateUser);
router.post('/addoctor', addDoctor);

module.exports = router;
