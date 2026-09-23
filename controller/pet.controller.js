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

const getAllPets = async (req, res) =>{
    const pets = await petSchema.find();
    return res.status(200).json(pets);
}

const updatePet = async (req, res) => {
    try{
        const { id } = req.params;
        const  { breed, age, picture, cost, quantity } = req.body;
        const pet = await petModel.findById(id);
        
        if (!pet) {return res.status(404).json({message: "Pet not found"});
        }
        if (breed) {
            pet.breed = breed
        }
        if (age) {
            pet.age = age;
        }
        if (picture) {
            pet.picture = picture;
        }
        if (cost) {
            pet.cost = cost;
        }
         if (quantity !== undefined) {
            pet.quantity = quantity;
        }
        await pet.save();

        return res.status(200).json({message: "pet updated successfully",
            data: pet
        });
    }catch(error){
        console.log(error.message);
        return res.status(500).json({message: "Error updating pet"});
    }
}

const buyPet = async (req, res) =>{
    try{
        const { breed } = req.body;

        if(!breed){
            return res.status(400).json({message: "Breed Name is required"});
        }

        const pet = await petModel.findOne({breedName});

        if(!pet){
            return res.status(404).json({message: "Pet not found"});
        }

        if(pet.quantity == 0){
            return res.status(400).json({message: "Pet is out of stock"});
        }

        pet.quantity = pet.quantity -1;
        await pet.save();

        return res.status(200).json({message: "Pet purchased successfully",
            data: pet
        });

    }catch(error){
       console.log(error.message);
        return res.status(500).json({message: "error purchasing pet"});
    }

};
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

module.exports = { createPet, getAllPets, updatePet, buyPet, deletePet };