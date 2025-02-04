import { Router } from "express";

// create a new express router

const router = Router();

// handle GET requests to the root of this router
router.get('/',(req,res)=>{
    // get the authenticated user's ID from the request object
    req.auth.userId;
    res.send('user route with GET method');
    // send a response with the text 'user route with GET method'
});


// export the router
export default router;