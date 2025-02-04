import { clerkClient } from "@clerk/express";


export const protectRoute = async(req, res, next) => {
    // Check if the user is authenticated by verifying the presence of userId
    if(!req.auth.userId){
        // If userId is not present, respond with 401 Unauthorized status
        res.status(401).json({message:"Unauthorized - you must be logged in"});
        return; // Exit the function to prevent further execution
    }
    // If the user is authenticated, proceed to the next middleware or route handler
    next();
};

export const requireAdmin = async(req, res, next) => {
    try {
        // Get the current user from Clerk
        const currentUser = await clerkClient.users.getUser(req.auth.userId);

        // Check if the user is an admin by comparing the email to the environment variable
        const isAdmin = process.env.ADMIN_EMAIL === currentUser.primaryEmailAddress?.emailAddress;

        // If the user is not an admin, return 403 Forbidden
        if (!isAdmin) {
            return res.status(403).json({ message: "Unauthorized - you must be an admin" });
        }

        // If the user is an admin, call the next middleware
        next();
    }catch (error) {}
}
