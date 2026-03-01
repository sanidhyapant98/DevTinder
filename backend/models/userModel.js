import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    age : {
        type : Number,
    },
    gender : {
        type : String,
        enum : {
            values: ['male', 'female', 'other'],
            message: '{VALUE} is not supported'
        }
    },
    skills : {
        type : Array,
        default : []
    },
    profileUrl : {
        type : String,
        default : ""
    },
    bio : {
        type : String,
        default : ""
    }
},{timestamps : true})

export const User = mongoose.model("User", userSchema)