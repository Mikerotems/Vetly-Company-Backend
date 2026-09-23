const { default: mongoose } = require("mongoose");


const petSchema = new mongoose.Schema({
    breed : {type: String, required:true},
    Age : {type: String, required: true},
    cost : {type: String, required: true},
    picture : {type: String, required: true},
    quantity : {type: Number, required: true}
}, {timestamp: true}) 

const petModel = mongoose.model("pet", petSchema);

module.exports = petModel;
