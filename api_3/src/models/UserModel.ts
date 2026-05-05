import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({

    //db table/collection
    // default => _id => key property, __v => keeping the version of model

    name:{
        type: String,
        min: 2,
        max:50,
        required: true,
        index:true,
    },
    email:{
        type: String,
        required: true,
        unique:true,
    },
    bio:String,
    gender:{
        type:String,
        enum:["male","female","others"],
    },
    password:{
        type: String,
        required: true,
    },
    role:{
        type: String,
        enum: ['admin','customer','seller'],
        default:"customer",
    },
    image:{
        id: String,
        url: String,
        optimized: String,
    },
    address:String,
    phone:String,


},{
    //db table options
    timestamps: true,  //created at / updated at
    autoCreate:true,
    autoIndex:true,
})




const UserModel = mongoose.model("User",UserSchema)

export default UserModel
