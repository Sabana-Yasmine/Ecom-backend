const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
    
        required : true
    },
    active : {
        type : String,
        default : false
    },
    // phonenumber : {
    //     type : String,
    //     minLength : 10,
    //     maxLength : 10,
    //     required : true
    // },
    loginstatus : {
        type : Boolean,
        default :false,
    },
    // role :{
    //     type : String,
    //     required : true

    // }
},{
    timeStamps : true
}
)

const user = mongoose.model("user", userSchema)

module.exports = user;