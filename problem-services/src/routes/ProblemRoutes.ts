import { Router } from "express";
import { ProblemController } from "../controllers/ProblemsControllers.js";
import multer from "multer"

const router = Router();

const controller = new ProblemController()

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

router.post('/problem',controller.create);
router.post(
  "/problems/:slug/content",
  upload.fields([
    { name: "statement", maxCount: 1 },
    { name: "examples", maxCount: 1 },
    { name: "constraints", maxCount: 1 },
  ]),
  controller.uploadContent
);
router.get('/problem/:slug',controller.getBySlug);

export default router