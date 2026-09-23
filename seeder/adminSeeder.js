const dotenv = require ("dotenv");
const userModel = require("../models/user.model");
const bcrypt = require ("bcrypt");

dotenv.config();


const createAdmin = async () => {
    try {

        const existingAdmin = await userModel.findOne({ email: process.env.ADMIN_EMAIL });
        if(existingAdmin) {
            console.log("Admin account already exists");
            return;
        }

        const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASS, 10);
        
        await userModel.create({
            name: process.env.ADMIN_NAME,
            email: process.env.ADMIN_EMAIL,
            password: hashedPassword,
            role: "ROLE_ADMIN"
        });

        console.log("Admin account created successfully");

    }catch (error) {
        console.error();
        ("Error creating the admin account:" ,error.message);
    }

}


module.exports = createAdmin;