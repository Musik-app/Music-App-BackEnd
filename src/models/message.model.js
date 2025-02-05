import mongoose from "mongoose"; // Import mongoose library

// Define a new schema for messages
const messageSchema = new mongoose.Schema(
    {
        senderId: { type: String, required: true }, // Sender's Clerk user ID (authenticated user)
        receiverId: { type: String, required: true }, // Receiver's Clerk user ID
        content: { type: String, required: true }, // The actual message content
    },
    { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create and export the Message model based on the schema
export const Message = mongoose.model("Message", messageSchema);
