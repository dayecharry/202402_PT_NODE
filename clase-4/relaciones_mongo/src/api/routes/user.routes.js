const express = require('express');
const router = express.Router();
const {
  addUser,
  selectUser,
  updateUser,
} = require('../controllers/user.controller');

router.post('/add', addUser);
router.get('/select', selectUser);
router.put('/update/:id', updateUser);

module.exports = router;
