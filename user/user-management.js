const router = require("express").Router();
const bcrypt = require ("bcrypt");
const userSchema = require ("../user/user-model")
const sendEmail = require('../util/email');
const database = require ('../database/db')
const User = require("../user/user-model")
const user = require('./user-model');
const jwt = require("jsonwebtoken");

//Register

router.post('/Register', async(req,res)=>{
    console.log (" User Register process started ");
    try{
     let {username, email, password} = req.body;
     console.log("get values")
        if(username && email && password){
          console.log("check if all values are given")
            let emailData = await User.findOne({email : email}).exec()

             if(!emailData){
               console.log("check if email alredy exist")
                 const user = new User(req.body)
                 const salt = await bcrypt.genSalt(10);
                 user.password = await bcrypt.hash(user.password, salt)
                 user.save()

                 let html = `<h1> Email Confirmation</h1>
                 <p>Please click the link to activate your account</p>
                 <a href = http://localhost:402/user/verify?email=${email}> click here </a>`
                
                 console.log("verification starts");
                
                 await sendEmail(email, "verify Email",html)

                 res.status(200).json({
                     status : false,
                     message : "User registed successfully"
                   })
            }else{
                   res.status(200).json({
                     status : false,
                     message : "user already exists please login"
                   })
                }
           }else{
                  res.status(200).json({
                    status : false,
                    message : "please enter all values"
                  })           
                }
        

    }catch(error){
        console.log(error)
    }
})

//Email Verification

router.get('/verify',async(req,res)=>{
  console.log("verifying email");
  let email = await User.findOne({email:req.query.email}).exec();
  if(email){
    let status = await User.findOneAndUpdate({email:req.query.email},{active:true},{new:true}).exec();
    if(status.active){
      res.status(200).send({message:"Email Verified Successfully"})
    }else{
      res.status(200).send({message:"something wemt wrong !"})
    }
  }
})

//User_login

router.post('/userlogin', async (req,res)=>{
  console.log(req.body)
  try{
    console.log("user logging in")
      let email = req.body .email
      let password = req.body.password
      await userSchema.findOne({email:email}).then(data=>{
          bcrypt.compare(password,data.password,function(err,result){
              if(err){
                  return res.json({"err" : err.message})
              }
              if(result){
                  const token = jwt.sign({data},process.env.jwtkey,{expiresIn:"1h"});
                  console.log("token",token)
                  return res.json({"status" : "success",token})
              }else{
                  return res.json({status:"failed",message : "invalid password"})
              }
          })
      }).catch(err=>{
        return res.json({status :"failure" , message : err.message})
    })

  }catch(err){
      return res.json({"err" : err.message})
  }
})

router.get("/tokenverify", async(req,res)=>{
  try{
      let token = req.header("token")
      if(!token){
          return res.json({sataus : "failure", message : "token not received"})
      }
      const decode = jwt.verify(token,process.env.jwtkey);
      return res.json({status : "success" , "result" : decode})
  }catch(err){
      return res.json({"err" : err.message})
  }
})



module.exports = router;