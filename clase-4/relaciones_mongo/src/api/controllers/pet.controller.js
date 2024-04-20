const Pet = require("../models/pet.model")

const addPet = async (req, res) => {
    try {
        console.log(req.body)
        const newPet = new Pet(req.body)
        const findPet = await Pet.find({ name: req.body.name })
        console.log(findPet)
        if (findPet.length !== 0) {
            return res.json({ message: "Esta ya está registrada" })
        }
        const createdPet = await newPet.save();
        return res.json(createdPet)
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

const selectPet = async (req, res) => {
    const pets = await Pet.find();
    return res.status(200).json(pets)
}
const selectOnePet = async (req, res) => {
    try {
        const { id } = req.params;
        const findPet = await Pet.findOne({ _id: id })
        return res.status(200).json(findPet)

    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}
const updatePet = async (req, res) => {
    try {
        const { id } = req.params;
        const petBody = new Pet(req.body)
        petBody._id = id;
        const updatePet = await Pet.findByIdAndUpdate(id, petBody, { new: true })
        console.log(updatePet)
        if (!updatePet) {
            return res.status(404).json({ message: "Pet no existe" })
        }
        return res.status(200).json(updatePet)

    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }

}
const deletePet = async (req, res) => {
    try {
        const id = req.params.id;
        const deletePet = await Pet.findByIdAndDelete(id);
        if (!deletePet) {
            return res.status(404).json({ message: "Mascota no existe" })
        }
        return res.status(200).json(deletePet)
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }

}

module.exports = { addPet, selectPet, selectOnePet, updatePet, deletePet }