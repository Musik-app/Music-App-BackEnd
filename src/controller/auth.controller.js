import { user } from "../models/user.model.js";

export const authCallback =async(req, res)=> {
    try{
     const {id,firstName,lastName,imageUrl} = req.body;
 
     // check if user already existis
     const user = await user.findOne({clerkId:id});
     if(!user){
         await user.create({
             clerkId:id,
             fullName:`${firstName} ${lastName}`,
             imageUrl
         })
     }
     res.status(200).json({success:true});
    }catch (error){
     console.log("Error in auth calback",error);
     res.status(500).json({success:false})
    }
 }