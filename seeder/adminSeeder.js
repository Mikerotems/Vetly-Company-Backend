const dotenv = require ("dotenv");

dotenv.config();

const bcrypt = require ("bcrypt");
const UserModel = require ("../models/userModel");

const createAdmin = async () => {
    try {

        const existingAdmin = await UserModel.findOne({ email: process.env.ADMIN_EMAIL });
        if(existingAdmin) {
            console.log("Admin account already exists");
            return;
        }

        const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASS, 10);
        
        await UserModel.create({
            email: process.env.ADMIN_EMAIL,
            password: hashedPassword,
            role: "ROLE_ADMIN"
        });

        console.log("Admin account created successfully");

    }catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: "Error creating the admin account" });
}

}


module.exports = createAdmin;