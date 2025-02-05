import dotenv from "dotenv" // dotenv
dotenv.config();// Load environment variables

// Import necessary libraries and modules
import express from "express"; // Express framework
import { clerkMiddleware } from '@clerk/express'; // Clerk middleware for authentication
import userRoutes from "./routes/user.route.js"; // User routes
import adminRoutes from "./routes/admin.route.js"; // Admin routes
import authRoutes from "./routes/auth.route.js"; // Auth routes
import songRoutes from "./routes/song.route.js"; // Song routes
import albumRoutes from "./routes/album.route.js"; // Album routes
import statRoutes from "./routes/stat.route.js"; // Stat routes
import { connectDB } from "./lib/db.js"; // MongoDB connection
import fileupload from "express-fileupload"; // File upload middleware
import path from "path";// Path module

const app = express();// Create an instance of express
const PORT = process.env.PORT; // Port number from environment variables
const __dirname = path.resolve();// Resolve the absolute path of the current directory



// Middlewares
app.use(express.json()); // Middleware to parse JSON bodies
app.use(clerkMiddleware()); // Middleware for authentication
app.use(fileupload({
    useTempFiles: true,// Use temporary files
    tempFileDir: path.join(__dirname, "../tmp"),// Temporary directory for file uploads
    createParentPath: true,// Create parent directory if it doesn't exist
    limits: { fileSize: 10 * 1024 * 1024 } // Limit file size to 10MB
})); // Middleware for file uploads

// Route handlers
app.use("/api/users", userRoutes); // User route handler
app.use("/api/admin", adminRoutes); // Admin route handler
app.use("/api/auth", authRoutes); // Auth route handler
app.use("/api/songs", songRoutes); // Song route handler
app.use("/api/albums", albumRoutes); // Album route handler
app.use("/api/stats", statRoutes); // Stat route handler

//error handler
app.use((err, req, res, next) => {
    res.status(500).json({message:process.env.NODE_ENV === "production" ? "Internal server error": err.message});// Send error response
})
// Start the server
app.listen(PORT, () => {
    console.log("✅ Server is running on port " + PORT + " 🥰"); // Log server start message
    connectDB(); // Connect to the database
});
