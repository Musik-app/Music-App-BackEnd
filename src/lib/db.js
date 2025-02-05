import dotenv from "dotenv"; // dotenv: package to load environment variables from .env file
dotenv.config(); // Load environment variables: loads variables from .env file into the program's environment

import { v2 as cloudinary } from 'cloudinary'; // Import cloudinary: importing the Cloudinary package for use in the application

// Validate required environment variables for Cloudinary configuration
if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    console.error("❌ Cloudinary configuration error: Missing required environment variables.");
    // If any required environment variables are missing, print error message to the console
    process.exit(1); // Exit the process if configuration is missing: stop the application if variables are not found
}

// Configure Cloudinary with the environment variables
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Cloud name: using the cloud name from the environment variable
    api_key: process.env.CLOUDINARY_API_KEY, // API key: using the API key from the environment variable
    api_secret: process.env.CLOUDINARY_API_SECRET, // API secret: using the API secret from the environment variable
});

console.log("✅ Cloudinary configured successfully."); // Log success message to the console

export default cloudinary; // Export Cloudinary for use in other parts of the application
