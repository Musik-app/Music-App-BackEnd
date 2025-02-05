
import { Router } from "express";// Import Router to create modular route handlers
import { protectRoute } from "../middleware/auth.middleware.js";
import { getAllUsers } from "../controller/user.controller.js";

// create a new express router
const router = Router();
// Handle GET requests to the '/api/users' endpoint
router.get("/", protectRoute, getAllUsers);
// todo: getMassages


// Export the router to be used in the main server file
export default router;

