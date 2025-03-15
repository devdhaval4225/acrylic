const { config } = require('../config/index');

const mongoose = require('mongoose');
// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/playAi').then(() => {
    console.log("Connection SuccessFully");
})
.catch((err) => {
    console.log(err);
    console.log("Not Connected");
})