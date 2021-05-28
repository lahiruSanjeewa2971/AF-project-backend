const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();

//lahiru added to file upload
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')
require("dotenv").config();

const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json())
app.use(fileUpload({
    useTempFiles: true
}))

//cookie-parser is parse the Cookie header and handle cookie separation and encoding, maybe even decrypt it
app.use(cookieParser())

// Routes
app.use('/user', require('./routes/userRouter'))

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
    useCreateIndex: true, 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,

});

const connection = mongoose.connection;
connection.once("open", ()=>{
    console.log('Mongodb connected..!');
})


app.listen(PORT, ()=>{
    console.log('Server is up and running on :', PORT)
})