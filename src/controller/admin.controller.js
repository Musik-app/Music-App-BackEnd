import { Album } from "../models/album.model.js"; // Import the Album model to interact with the album collection
import { Song } from "../models/song.model.js"; // Import the Song model to interact with the song collection
import cloudinary from "../lib/cloudinary.js"; // Import Cloudinary to handle file uploads to Cloudinary

// Helper function to upload files to Cloudinary
const uploadToCloudinary = async (file) => {
  try {
    // Upload the file to Cloudinary, setting the resource type to "auto" to allow both image and audio file uploads
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      resource_type: "auto", // Automatically determine the resource type (image or audio)
    });

    // Return the secure URL of the uploaded file, which can be used in the app
    return result.secure_url;
  } catch (error) {
    console.log("Error uploading file to cloudinary", error); // Log any errors that occur during the upload
    throw new Error("Error uploading file to cloudinary"); // Throw an error to handle it later in the catch block
  }
};

// Controller function to create a new song
export const createSong = async (req, res, next) => {
  try {
    // Check if the necessary files (audioFile and imageFile) are uploaded in the request
    if (!req.files || !req.files.audioFile || !req.files.imageFile) {
      return res.status(400).json({ message: "Please upload all files" }); // Return an error if files are missing
    }

    // Destructure the song details from the request body
    const { title, artist, albumId, duration } = req.body; // Extract song title, artist, album ID, and duration from request body

    // Extract the audio and image files from the request
    const audioFile = req.files.audioFile; // Get the audio file from the request
    const imageFile = req.files.imageFile; // Get the image file from the request

    // Upload the audio and image files to Cloudinary
    const audioUrl = await uploadToCloudinary(audioFile); // Upload the audio file and get its secure URL
    const imageUrl = await uploadToCloudinary(imageFile); // Upload the image file and get its secure URL

    // Create a new Song document in the database
    const song = new Song({
      title, // Set the song title
      artist, // Set the song artist
      audioUrl, // Set the audio URL (from Cloudinary)
      imageUrl, // Set the image URL (from Cloudinary)
      duration, // Set the duration of the song
      albumId: albumId || null, // Set the album ID if available, otherwise set it to null
    });

    // Save the song document to the database
    await song.save(); // Save the song to the database

    // If the song belongs to an album, update the album's songs array by adding the song's ID
    if (albumId) {
      await Album.findByIdAndUpdate(albumId, { $push: { songs: song._id } }); // Add the song to the album's songs array
    }

    // Return the created song as a response with a status code of 201 (Created)
    res.status(201).json(song); // Send the created song back in the response
  } catch (error) {
    console.log("Error creating song", error); // Log any errors that occur while creating the song
    res.status(500).json({ message: "Internal server error", error }); // Send a 500 error if something goes wrong
    next(error); // Pass the error to the next middleware for further handling
  }
};

// Controller function to delete a song by its ID
export const deleteSong = async (req, res, next) => {
  try {
    // Get the song ID from the request parameters
    const { id } = req.params; // Extract the song ID from the URL parameter

    // Find the song by its ID in the database
    const song = await Song.findById(id); // Find the song by its ID in the Song collection

    // If the song belongs to an album, update the album's songs array by removing the song's ID
    if (song.albumId) {
      await Album.findByIdAndUpdate(song.albumId, { $pull: { songs: song._id } }); // Remove the song from the album's songs array
    }

    // Delete the song from the database
    await Song.findByIdAndDelete(id); // Delete the song from the database by its ID

    // Send a success message as the response
    res.status(200).json({ message: "Song deleted successfully" }); // Return a success message
  } catch (error) {
    console.log("Error deleting song", error); // Log any errors that occur while deleting the song
    next(error); // Pass the error to the next middleware for further handling
  }
};
