const mongoose = require("mongoose")
const crypto = require ("crypto")

const userSchema = new mongoose.Schema({

    uuid : {
        type : String,
        required : false
    },
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
        type : Boolean,
        default : false
    },
    
    loginstatus : {
        type : Boolean,
        default :false,
    },
    role :{
        type : String,
        required : true

    }
},{
    timeStamps : true
})

// UUID creation

userSchema.pre('save',function(next){
    this.uuid="USER-"+crypto.pseudoRandomBytes(5).toString('hex').toUpperCase()
    console.log(this.uuid);
    next();
});

const user = mongoose.model("user", userSchema)

module.exports = user;