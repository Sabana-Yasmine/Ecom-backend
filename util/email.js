//import nodemailer from "nodemailer"
 
const nodemailer = require('nodemailer')
const sendMail = async(email , subject , html)=>{
    try{

    const transporter = nodemailer.createTransport({
        host : process.env.host,
        service : process.env.service,
        auth :{
            user : process.env.user,
            pass : process.env.pass
        }
    });

    await transporter.sendMail({
        from : process.env.user,
        to : email,
        subject : subject,
        html : html,
    }).then((data)=>{
        console.log("email sent", data)
    }).catch((error)=>{
        console.log("error", error)
    })

    }catch(error){
        console.log("email not sent",error);
    }
 }
 module.exports = sendMail;