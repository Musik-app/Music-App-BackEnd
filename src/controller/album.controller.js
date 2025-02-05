import { Album } from "../models/album.model.js"; // Import the Album model to interact with the album collection in the database

// Controller function to get all albums
export const getAllAlbums = async (req, res, next) => {
  try {
    // Find all albums in the database using the Album model
    const albums = await Album.find(); // This fetches all album records from the database
    res.status(200).json(albums); // Return the albums with a 200 status code
  } catch (error) {
    next(error); // If an error occurs, pass it to the error handling middleware
  }
};

// Controller function to get a single album by its ID
export const getAlbumById = async (req, res, next) => {
  try {
    // Extract the albumId from the request parameters
    const { albumId } = req.params; // Get the albumId from the URL parameter

    // Find the album by ID and populate the 'songs' field (which is a reference to other documents in the Song collection)
    const album = await Album.findById(albumId).populate("songs"); // Fetch the album along with its songs

    // If the album is not found, return a 404 error
    if (!album) {
      return res.status(404).json({ message: "Album not found" }); // Return an error if the album doesn't exist
    }
    res.status(200).json(album); // If the album is found, return it with a 200 status code
  } catch (error) {
    next(error); // If an error occurs, pass it to the error handling middleware
  }
};
