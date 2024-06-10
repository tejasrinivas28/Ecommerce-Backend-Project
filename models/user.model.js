const mongoose = require('mongoose')

/**
 * I wanna track ,
 * name
 * userId
 * password
 * email
 * userType
 */


const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    userId : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        lowercase : true,
        minLength : 10,
        unique : true
    },
    userType : {
        type : String,
        default : "CUSTOMER",
        enum : ["CUSTOMER","ADMIN"]

    },
    cart : {
        type : [String],
        default : []
    },
    total_cost : {
        type : Number,
        default : 0
    }



},{timestamps : true,versionKey : false})

// This will create a Collection named Users..
module.exports = mongoose.model("user",userSchema)



