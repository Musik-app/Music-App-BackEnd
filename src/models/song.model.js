import mongoose from "mongoose";
const songSchma = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    artist:{
        type:String,
        required:true,
    },
    imageUrl:{
        type:String,
        required:true,
    },
    AudioUrl:{
        type:String,
        required:true,
    },
    duration:{
        type:Number,
        required:true,
    },
    albumId:{
        type:mongoose.Schema.Types.ObjectId,
        required:false,
        ref:'Album'
    },
},
{timestamps:true}
); 
export const song = mongoose.model('song',songSchma);