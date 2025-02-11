import dotenv from "dotenv" // dotenv
dotenv.config();// Load environment variables
import { v2 as cloudinary } from 'cloudinary'; // Import cloudinary

// Validate environment variables
if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    console.error("❌ Cloudinary configuration error: Missing required environment variables.");
    process.exit(1); // Exit the process if configuration is missing
}

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Cloud name
    api_key: process.env.CLOUDINARY_API_KEY, // API key
    api_secret: process.env.CLOUDINARY_API_SECRET, // API secret
});

console.log("✅ Cloudinary configured successfully. 😍"); // Log success message

export default cloudinary; // Export Cloudinary
