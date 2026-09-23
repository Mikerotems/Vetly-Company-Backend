const express = require ("express");
const connectDB = require("./db/database");
const dotenv = require("dotenv");
const cors = require("cors");
const { handleUpload, cloudinary } = require("./config/cloudinary");
const multer = require("multer");
const { v2 } = require("cloudinary");
const upload = require("./config/multer");
const {userRouter, petRouter} = require("./routes/user.routes");
const createAdmin = require("./seeder/adminSeeder");

dotenv.config();

const app = express();


createAdmin();

// middlewares
app.use(express.json());
app.use(cors());
app.use(multer);
app.use("/users", userRouter);
app.use("/pets", petRouter);


// cloudinary middleware 
app.post("/upload", upload.single("my_file"), async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    const cldRes = await handleUpload(dataURI);
    res.json(cldRes);
  } catch (error) {
    console.log(error);
    res.send({
      message: error.message,
    });
  }
});

app.use((req, _res, next) => {
    console.log("req method: ", req.method, "req URL: ", req.url)
    next();

app.get("/", (req, res) =>{
    return res.status(200).json("health");
})

// construct db
(async () =>{
    await connectDB();
})();

})
module.exports = app;