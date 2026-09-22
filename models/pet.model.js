const { default: mongoose } = require("mongoose");


const petSchema = new mongoose.Schema({
    breedName : {type: String, required:true},
    Age : {type: String, required: true},
    cost : {type: String, required: true},
    petPicture : {type: String, required: true}
})

const petModel = mongoose.model("Pet", petSchema);

module.exports = petModel;
