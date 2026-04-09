import mongoose from "mongoose";

const userSchema=mongoose.Schema({

   fullName:{
        type:String,
        required:true
    } ,

    faculty:{
        type:String,
        required:true   

    },

    userType:{
        type:String,
        required:true
    },

    password:{
        type:String,
        required:true
    },

    registrationNumber:{
        type:Number,
        required:true
    },

    email:{
        type:String,
        required:true,
        unique:true

    },

    mobileNumber:{
        type:Number,
        required:true
    }
});

const User=mongoose.model("users",userSchema);
export default User
