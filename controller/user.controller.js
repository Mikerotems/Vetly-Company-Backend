const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const createUser = async (req, res) =>{
    const { username, email, password} = req.body;
     try {
        // validation
        if (!email.includes("@")) {
            return res.status(400).json("please enter a valid email");
        }

        if (!email) {
            return res.status(400).json("email required");
        }

        if (!password) {
            return res.status(400).json("password required");
        }

        if (!username) {
            return res.status(400).json("username required");
        }

        const userExist = await userModel.findOne({ email });
        if (userExist) {
            return res.status(409).json("user already exist");
        }

        const usernameExist = await userModel.findOne({ username });
        if (usernameExist) {
            return res.status(409).json("username already exist");
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = await userModel.create({
            email,
            username,
            password: hashPassword
        });
        return res.status(201).json(newUser);

    } 
    catch (err) {
        console.log("error creating user");
        } 
  }

  const loginUser = async (req, res) => {
    try{
        const { email, password } = req.body;


    if (!email) {
        return res.status(400).json("email required");
    }


    const userExist = await userModel.findOne({ email }); 


    if (!userExist) {
        return res.status(404).json("user does not exist");
    }


    if (!password) {
        return res.status(400).json("password required");
    }

    const validPassword = await bcrypt.compare(password, userExist.password);

    if (!validPassword) {
        return res.status(400).json("invalid credential");
    }

    const payload = { id: userExist._id, email: userExist.email }
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn:
            "45m"
    }); 
    return res.status(200).json({
        message: "Login successful",
        token: accessToken
    });
}
catch (error) {
    console.log(error.message);
    return res.status(500).json({
        message: "Internal server error"
    });
}
  }
module.exports = { createUser, loginUser };