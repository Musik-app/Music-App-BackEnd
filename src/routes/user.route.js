import { Router } from "express";// Import Router to create modular route handlers

// create a new express router

const router = Router();

// Handle GET requests to the '/api/users' endpoint
router.get('/',(req,res)=>{
    req.auth.userId;
    res.send('user route with GET method');// Send a JSON response
});



// Export the router to be used in the main server file
export default router;