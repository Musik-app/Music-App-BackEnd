import { clerkClient } from "@clerk/express"; // Import Clerk client for user authentication

// Middleware to protect a route by checking if the user is authenticated
export const protectRoute = async (req, res, next) => {
    // Check if the user is authenticated by verifying the presence of userId in the request object
    if (!req.auth?.userId) {
        // If userId is not found, return a 401 Unauthorized error
        return res.status(401).json({ message: "Unauthorized - You must be logged in to access this resource." });
    }
    // If the user is authenticated, proceed to the next middleware or route handler
    next();
};

// Middleware to require admin privileges to access certain routes
export const requireAdmin = async (req, res, next) => {
    try {
        // Get the current user from Clerk using the userId present in the request
        const currentUser = await clerkClient.users.getUser(req.auth?.userId);

        // Check if the current user's email matches the admin email stored in the environment variable
        const isAdmin = process.env.ADMIN_EMAIL === currentUser.primaryEmailAddress?.emailAddress;

        // If the user is not an admin, return a 403 Forbidden error
        if (!isAdmin) {
            return res.status(403).json({ message: "Forbidden - You must be an admin to access this resource." });
        }

        // If the user is an admin, proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error("Error in requireAdmin middleware:", error); // Log the error for debugging purposes
        // Return a 500 Internal Server Error in case of an exception
        res.status(500).json({ message: "Internal Server Error - Please try again later." });
    }
};
