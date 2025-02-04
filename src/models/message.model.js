import mongoose from "mongoose"; // Import mongoose library

// Define a new schema for messages
const messageSchma = new mongoose.Schema({
    senderId: { type: String, required: true }, // Sender's Clerk user ID
    receiverId: { type: String, required: true }, // Receiver's Clerk user ID
    content: { type: String, required: true }, // Message content
},
{ timestamps: true } // Automatically manage createdAt and updatedAt timestamps
);
// Create a model for the message schema and export it
export const Message = mongoose.model("Message", messageSchma);
