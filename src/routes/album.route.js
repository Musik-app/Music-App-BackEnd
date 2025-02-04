import { Router } from "express";
import { getAllAlbums } from "../controller/album.controller.js";

const router = Router();

router.get("/", getAllAlbums);
router.get("/:albumId", getAlbumById);

export default router;
