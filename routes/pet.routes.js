const express = require("express");
const petRouter = express.Router();


const authenticate = require("../middleware/authMiddleware");
const authenticateAdmin = require("../middleware/adminMiddleware");
const upload = require("../middleware/uploadMiddleware");
const { getAllPets, createPet, updatePet, deletePet, buyPet } = require("../controller/pet.controller");

petRouter.post("/create", authenticate, upload.single("picture"), createPet);
petRouter.get("/all", authenticate, getAllPets);
petRouter.put("/update/:id", authenticate, updatePet);
petRouter.delete("/delete", authenticate, authenticateAdmin, deletePet);
petRouter.post("/buy", authenticate, buyPet);


module.exports = petRouter;
