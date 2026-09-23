
const { default: mongoose } = require("mongoose");
const app = require("./app");
const createAdmin = require("./seeder/adminSeeder");


const port = process.env.PORT || 1234;

const startServer = async () => {
try {
    // Connect to MongoDB FIRST
    await mongoose.connect(process.env.DB_URL);
    console.log("MongoDB connected successfully");

    // Seed admin AFTER database connection
    await createAdmin();
// Start server AFTER database is ready
    app.listen(port, () => console.log("app is running on port " + port));
} 
catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
}
};

// (async () =>{
//     await connectDB();
// })();

startServer();

