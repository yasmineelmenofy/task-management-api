import { Request, Response } from "express";
import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/apiError";

import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "../services/task.service";

/*
POST /tasks
Create Task
*/
export const createTaskController = asyncHandler(
  async (req: Request, res: Response) => {
    const task = await createTask(req.body);

    res.status(201).json({
      message: "Task created successfully",
      data: task,
    });
  }
);

/*
GET /tasks
Get All Tasks
*/
export const getAllTasksController = asyncHandler(
  async (req: Request, res: Response) => {
    const tasks = await getTasks();

    res.status(200).json({
      message: "Tasks retrieved successfully",
      data: tasks,
    });
  }
);

/*
GET /tasks/:id
Get Single Task
*/
export const getTaskByIdController = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ApiError("Invalid task id", 400);
    }

    const task = await getTaskById(id);

    if (!task) {
      throw new ApiError("Task not found", 404);
    }

    res.status(200).json({
      message: "Task retrieved successfully",
      data: task,
    });
  }
);

/*
PATCH /tasks/:id
Update Task
*/
export const updateTaskController = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ApiError("Invalid task id", 400);
    }

    const task = await updateTask(id, req.body);

    if (!task) {
      throw new ApiError("Task not found", 404);
    }

    res.status(200).json({
      message: "Task updated successfully",
      data: task,
    });
  }
);

/*
DELETE /tasks/:id
Delete Task
*/
export const deleteTaskController = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ApiError("Invalid task id", 400);
    }

    const task = await deleteTask(id);

    if (!task) {
      throw new ApiError("Task not found", 404);
    }

    res.status(200).json({
      message: "Task deleted successfully",
    });
  }
);