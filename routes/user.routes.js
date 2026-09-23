const express = require ("express");
const userRouter = express.Router();
const { createUser, loginUser} = require("../controller/user.controller");
const authenticate = require("../middleware/auth.middleware");
const { getAllPets } = require("../controller/pet.controller");


userRouter.post("/signup", createUser);
userRouter.post("/login", loginUser);
userRouter.get("/all", getAllPets);
userRouter.get("/auth", authenticate, (req, res) =>{
    return res.status(200).json({
        message : "Authenticate successful",
        user: req.user
    });
});



module.exports = userRouter;