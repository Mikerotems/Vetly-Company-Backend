const express = require("express");
const petRouter = express.Router();


const { getAllPets, createPet, updatePet, deletePet, buyPet } = require("../controller/pet.controller");
const authenticate = require("../middleware/auth.middleware");
const authenticateAdmin = require("../middleware/admin.middleware");
const upload = require("../config/multer");

petRouter.post("/create", authenticate, upload.single("picture"), createPet);
petRouter.get("/all", authenticate, getAllPets);
petRouter.put("/update/:id", authenticate, updatePet);
petRouter.delete("/delete", authenticate, authenticateAdmin, deletePet);
petRouter.post("/buy", authenticate, buyPet);


module.exports = petRouter;
