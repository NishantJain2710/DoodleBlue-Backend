import mongoose from "mongoose";

let userDetailsSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:true
    },
    password:String,
    place:String,
    latitude:Number,
    longitude:Number,
    incognito:{
        type:Boolean,
        default:false
    }
})

export default mongoose.model("UserDetails", userDetailsSchema);