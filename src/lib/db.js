import mongoose from "mongoose";// Import mongoose

// Function to connect to MongoDB
export const connectDB = async() => {
    try{
       const conn = await mongoose.connect(process.env.MONGODB_URI);// Connect to MongoDB using the MONGODB_URI environment variable
       console.log("✅ Connected to MongoDB  😍");//Log a success message
    }catch(error){
        console.log("❌ Failed to connect to mongoDB",error)// Log an error message
    }
};