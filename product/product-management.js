const router = require("express").Router();
const bcrypt = require ("bcrypt");
const productSchema = require ("../product/product-model");
const database = require ('../database/db');
const Product = require("./product-model");
const {Auth} = require ("../user/auth");

//Create product

router.post("/addproduct" ,Auth, async(req,res) =>{
 try{

    const productDetails = req.body
    const result = productSchema(productDetails)
    const newProduct = await result.save()
    return res.status(200).json({"status":"success", "message":"product added successfully", "result": newProduct})

 }catch(error){
    return res.status(400).json({"status":"failure","message":error.message})
 }
})

// read specific product

router.get("/getproduct",async(req,res) =>{
    try{        

        const productDetails = await productSchema.find(req.query).exec()
        return res.status(200).json({"status": "success", "message":"product fetched successfully", "result": productDetails})

    }catch(error){
        return res.status(400).json({"status":"failure","message":error.message}) 
    }
})

//read all product

router.get("/getallproduct",async(req,res) =>{
    try{        

        const productDetails = await productSchema.find().exec()
        return res.status(200).json({"status": "success", "message":"product fetched successfully", "result": productDetails})

    }catch(error){
        return res.status(400).json({"status":"failure","message":error.message}) 
    }
})

//update product

router.put("/updateproduct",Auth,async(req,res) =>{
    try{
    let condition = req.query
    let updateData = req.body
    let option = {new:true}
    const updateProduct = await productSchema.findOneAndUpdate(condition, updateData,option).exec()
    return res.status(200).json({"status": "success", "message":"product updated successfully", "result": option})
    } catch(error){
        return res.status(400).json({"status":"failure","message":error.message})
    }

})

//Delete Product

router.delete("/deleteproduct",Auth,async(req,res) =>{
    try{
        const productDetails = await productSchema.findOneAndDelete(req.query).exec()
        return res.status(200).json({"status": "success", "message":"product deleted successfully"})
    } catch(error){
        return res.status(400).json({"status":"failure","message":error.message})
    }   
    
})


module.exports = router;