require("./database/connection");
require("dotenv").config();
const express = require("express");
const cors = require("cors")
const app = express();
const cookiesParser = require("cookie-parser");

const port = process.env.PORT || 3000;

app.use(express.urlencoded({extended: false}));
app.use(cookiesParser());
app.use(express.json());
app.use(cors());

const userRoutes = require("./routes/users.routes")

app.use("/api/user",userRoutes);


app.listen(port, () => {
    console.log(`Server Running At PORT : ${port}`);
});