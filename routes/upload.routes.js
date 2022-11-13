import { Router } from "express";

import { uploadFile ,getListFiles, download } from "../controllers/upload.controller.js";

export const router = Router();

router.post("/upload", uploadFile);
router.get("/files", getListFiles);
router.get("/files/:name", download);

