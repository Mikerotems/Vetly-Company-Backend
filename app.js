const express = require ("express");
const connectDB = require("./db/database");
require("dotenv").config();
const userRouter = require("./routes/user.routes");
const petRouter = require("./routes/pet.routes");

const app = express();

// middlewares
app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/pets", petRouter);

// app.use((req, _res, next) => {
// console.log("req method: ", req.method, "req URL: ", req.url)
// next();

app.use("/", (_req, res) =>{
    return res.status(200).json("health");
})

// construct db


module.exports = app;