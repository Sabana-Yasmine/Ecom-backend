const jwt = require ("jsonwebtoken"); 

function isAdmin(req,res,next){
    try{
        console.log("token verificatiion");
        let token = req.header("token");
        if(!token)
        {
            return res.json({status : "failure", message : "Token not found" });
        }
        const decode = jwt.verify(token,process.env.jwtkey);
        console.log(decode);
        
        if(decode.data.role === "admin"){
          next();
        } else{
            return res.json({status : "failure", message : "unauthorised access"});
        }
       }catch(error){
        console.log(error.message);
        return res.json({status : "failure", message :"invalid token"})
       }
    }

function isValid(req,res,next){
  try{
    console.log("token verificatiion");
    let token = req.header("token");
    if(!token)       
    {
        return res.json({status : "failure", message : "unauthorised access" });
    }
    const decode = jwt.verify(token,process.env.jwtkey);
    console.log(decode);
    if(decode){
        console.log (decode);
        next();
    } else{
        return res.json({status : "failure", message : "unauthorised access"});
    }
   }catch(error){
    console.log(error.message);
    return res.json({status : "failure", message :"invalid token"})
    }     
  }


    module.exports ={isAdmin, isValid};
   
       