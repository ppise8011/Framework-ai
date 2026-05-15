import { Router } from "express";
import multer from "multer";
import path from "path";
import { uploadRoomImage } from "../controllers/upload.controller";
import { protect } from "../middleware/auth.middleware";

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, "uploads/"),
  filename: (_req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = [".jpg", ".jpeg", ".png", ".webp"];
    const ext = path.extname(file.originalname).toLowerCase();
    allowed.includes(ext) ? cb(null, true) : cb(new Error("Only images allowed"));
  },
});

const router = Router();

router.post("/room-image", protect, upload.single("image"), uploadRoomImage);

export default router;
