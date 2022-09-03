const jwt = require ("jsonwebtoken");
const userSchema = require("../user/user-model")
 
function Auth(req,res,next){
    try{
        console.log("token verificatiion");
        let token = req.header("token");
        let role =req.body;
        if(!token)
        {
            return res.json({status : "failure", message : "unauthorised access" });
        }
        constdecode = jwt.verify(token,process.env.jwtkey);
        console.log(decode);
        if(jwt.decode.role === "Admin"){
            console.log ("Admin");
            next();
        } else{
            return res.json({status : "failure", message : "unauthorised access"});
        }
       }catch(error){
        console.log(error.message);
        return res.json({status : "failure", message :"invalid token"})
       }

}
module.exports ={Auth};