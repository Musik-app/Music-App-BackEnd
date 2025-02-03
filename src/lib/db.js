import mongoose from "mongoose";

export const connectDB = async() => {
    try{
       const conn = await mongoose.connect(process.env.MONGODB_URI);
       console.log("Connected to MongoDB  😍");
    }catch(error){
        console.log("Failed to connect to mongoDB",error)
    }
};