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

// CREATE
router.post("/", validate(createTaskSchema), createTaskController);

// GET ALL
router.get("/", getAllTasksController);

// GET ONE
router.get("/:id", getTaskByIdController);

// UPDATE
router.patch("/:id", validate(updateTaskSchema), updateTaskController);

// DELETE
router.delete("/:id", deleteTaskController);

router.post("/", protect, createTaskController);
router.patch("/:id", protect, updateTaskController);
router.delete("/:id", protect, deleteTaskController);

export default router;
