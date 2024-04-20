const User = require('../models/user.model');

const addUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    const createdUser = await newUser.save();
    return res.json(createdUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const updateUser = async (req, res) => {
  try {
    const idUser = req.params.id;
    const idPet = req.body.id;
    console.log(idUser, idPet);
    const modifyUser = await User.findByIdAndUpdate(
      idUser,
      { $push: { pet: idPet } },
      { new: true }
    );
    return res.status(200).json(modifyUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const selectUser = async (req, res) => {
  const nameUser = req.query.name;
  //find({ name: 'alfonsina' })
  const users = await User.find({ name: nameUser }) //findOne devuelve el primero que encuentra
    .populate({ path: 'pet', select: 'name' })
    .populate({ path: 'doctor', select: 'name' });
  return res.status(200).json(users);
};

module.exports = { addUser, selectUser, updateUser };
