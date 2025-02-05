import { Router } from "express";
import { protectroute } from "../middleware/auth.middleware.js";
import { getAllUsers } from "../controller/user.controller.js";

const router = Router();

router.get("/", protectroute, getAllUsers);
// todo: getMassages
export default router;
