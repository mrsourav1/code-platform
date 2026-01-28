import { Router } from "express";
import { ProblemController } from "../controllers/ProblemsControllers.js";
import multer from "multer"
import { SubmissionController } from "../controllers/SubmissionController.js";

const router = Router();

const controller = new ProblemController()

const submissionController = new SubmissionController()

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
router.post('/submission/:slug/',)
router.post("/submit",submissionController.submit)
router.post("/:id",submissionController.getStatus)

export default router