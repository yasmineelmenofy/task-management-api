import { Router } from "express";
import {
  createTaskController,
  getAllTasksController,
  getTaskByIdController,
  updateTaskController,
  deleteTaskController,
} from "../controllers/task.controller";

import { validate } from "../middleware/validate.middleware";
import { createTaskSchema, updateTaskSchema } from "../schemas/task.schema";
import { protect } from "../middleware/auth.middleware";

const router = Router();

router.post("/", protect, validate(createTaskSchema), createTaskController);

router.get("/", protect, getAllTasksController);

router.get("/:id", protect, getTaskByIdController);

router.patch("/:id", protect, validate(updateTaskSchema), updateTaskController);

router.delete("/:id", protect, deleteTaskController);

export default router;
