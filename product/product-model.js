const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    productCategory : {type : String , required : true},

    productName : {type : String , required : true},

    price : {type : Number , required :true},

    quantity : {type : Number , required : true},

},{
     timeStamps : true,
})

const product = mongoose.model("product", productSchema)

module.exports = product;