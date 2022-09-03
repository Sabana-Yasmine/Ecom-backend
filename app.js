const express = require("express");
const app = express();
const mongoose = require ("mongoose");
const bodyparser = require ("body-parser");
const cors = require("cors");
require('dotenv').config();
const database = require ('./database/db')

app.use(cors());
app.use(express.json());

const userModel = require("./user/user-model")
const userControl = require("./user/user-management")
const productModel = require("./product/product-model")
const productControl = require("./product/product-management")

app.use('/user', userControl);
app.use('/product', productControl);

port = process.env.port;

app.listen(port, () =>{
    console.log("Server connected")
})