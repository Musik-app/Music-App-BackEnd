import dotenv from "dotenv" 
dotenv.config();
import { clerkMiddleware } from '@clerk/express'
import express from "express"
import userRoutes from "./routes/user.route.js"
import adminRoutes from "./routes/admin.route.js"
import authRoutes from "./routes/auth.route.js"
import songRoutes from "./routes/song.route.js"
import albumRoutes from "./routes/album.route.js"
import statRoutes from "./routes/stat.route.js"
import { connectDB } from "./lib/db.js";

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

// Create an instance of express
const app = express();
const PORT = process.env.PORT; // Port number from environment variables

// Middlewares
app.use(express.json()); // Middleware to parse JSON bodies
app.use(clerkMiddleware()); // Middleware for authentication
app.use(express.json()); // to parse req.body
app.use(clerkMiddleware());
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/stats", statRoutes);

// Route handlers
app.use("/api/users", userRoutes); // User route handler
app.use("/api/admin", adminRoutes); // Admin route handler
app.use("/api/auth", authRoutes); // Auth route handler
app.use("/api/songs", songRoutes); // Song route handler
app.use("/api/albums", albumRoutes); // Album route handler
app.use("/api/stats", statRoutes); // Stat route handler

// Start the server
app.listen(PORT, () => {
    console.log("Server is running on port " + PORT + " 🥰"); // Log server start message
    connectDB(); // Connect to the database
});
