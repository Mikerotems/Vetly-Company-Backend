const express = ("express");
const userRouter = express.Router();
const multer = require("multer");
const { createUser, loginUser, getAllPets } = require("../controller/user.controller");


userRouter.post("/signup", createUser);
userRouter.post("/login", loginUser);
userRouter.get("/all", getAllPets);


module.exports = userRouter;