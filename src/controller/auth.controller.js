import { user } from "../models/user.model.js"; // Import the user model to interact with the 'user' collection in the database

// Callback function for authentication (usually called after successful login)
export const authCallback = async (req, res, next) => {
  try {
    // Destructure the required user information from the request body
    const { id, firstName, lastName, imageUrl } = req.body; // Extract the user's ID, first name, last name, and image URL from the request body

    // Check if the user already exists in the database by searching for their clerkId (a unique ID from Clerk authentication)
    const user = await user.findOne({ clerkId: id }); // Search for a user with the given clerkId

    // If the user doesn't exist, create a new user
    if (!user) {
      await user.create({
        clerkId: id, // Store the clerkId from the Clerk authentication system
        fullName: `${firstName} ${lastName}`, // Combine the first and last name into a full name
        imageUrl, // Store the user's image URL
      });
    }
    
    // Respond with a success message
    res.status(200).json({ success: true }); // Send a response indicating the operation was successful
  } catch (error) {
    console.log("Error in auth callback", error); // Log the error if something goes wrong
    next(error); // Pass the error to the error-handling middleware
  }
};
