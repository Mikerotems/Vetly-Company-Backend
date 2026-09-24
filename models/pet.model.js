const { default: mongoose } = require("mongoose");


const petSchema = new mongoose.Schema({
    breed : {type: String, required:true},
    age : {type: String, required: true},
    cost : {type: String, required: true},
    picture : {type: String, required: true},
    quantity : {type: Number, required: true}
}, {timestamps: true}) 

const petModel = mongoose.model("pet", petSchema);

module.exports = petModel;
