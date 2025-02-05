import { Router } from "express"; // Import the express Router
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js"; // Import authentication (protectRoute) and authorization (requireAdmin) middlewares
import { createSong, deleteSong } from "../controller/admin.controller.js"; // Import controller functions for handling song creation and deletion


const router = Router();

// Protected route: Only authenticated admins can create a new song
router.post('/songs', protectRoute, requireAdmin, createSong);

// Protected route: Only authenticated admins can delete a song by ID
router.delete('/songs/:id', protectRoute, requireAdmin, deleteSong);

// Export the admin song management router
export default router; 
