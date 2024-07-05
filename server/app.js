const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./Routes/AuthRoutes");
const app = express();
const cookieParser = require("cookie-parser");

const PORT = 4000;

app.listen(PORT, () => {
    console.log("Server started on PORT: 4000");
});

mongoose.connect("mongodb://127.0.0.1:27017/jwt", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=> {
    console.log("mongodb connection succesfull");
}).catch((err) => {
    console.log(err.message);
});

app.use(cors({
    origin: ["http://localhost:3000"],
    method: ["GET", "POST"],
    credentials: true,
}));

app.use(cookieParser());
app.use(express.json());
app.use("/", authRoutes);