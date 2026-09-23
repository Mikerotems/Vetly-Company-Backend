const petModel = require("../models/pet.model");


const createPet = async (req, res) =>{
    const { breed, age, cost, picture} = req.body;
     try {
        // validation
        if (!breed) {
            return res.status(400).json("please enter the pet breed");
        }

        if (!age) {
            return res.status(400).json("pet age required");
        }

        if (!cost) {
            return res.status(400).json("cost of pet required");
        }

        if (!picture) {
            return res.status(400).json("please upload pet's picture");
        }
        //several pets can have same age or breed, picture is one of the valid ways to check it's existence
        const petExist = await petModel.findOne({ picture });
        if (petExist) {
            return res.status(409).json("pet already exist");
        }
        const newPet = await petModel.create({
                    breed,
                    age,
                    cost,
                    picture
                });
        return res.status(201).json(newPet);
    }
      catch (err) {
        next(err)
    } 
}

const updatePet = async (req, res) => {
    try{
    const petId = req.params.id; 
    const updatedPet = await petModel.findByIdAndUpdate(
        petId, req.body, {new:true, runValidators: true});
    if (!updatedPet) {
        return res.status(404).json("pet not found");
    }
    return res.status(200),json({
        message: "pet updated successfully",
        pet : updatedPet   
     })
    }
    catch (error){
        return res.status(500).json("error updating pet");
}};

const deletePet = async (req, res) =>{
    try{
        const { id }= req.params;
        const deletedPet = await petModel.findByIdAndDelete(id);

        if (!deletedPet){
            return res.status(404).json("Pet not found");
        }

        return res.status(200).json("Pet deleted successfully");
    }
    catch (error) {
        return res.status(500).json({
            message: "Error deleting pet", error: error.message});
        }
    }
module.exports = { createPet, updatePet, deletePet };