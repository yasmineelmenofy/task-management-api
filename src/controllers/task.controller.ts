import { Request, Response } from "express";
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
*/
export const createTaskController = asyncHandler(
  async (req: Request, res: Response) => {
    const task = await createTask(req.body);

    res.status(201).json({
      message: "Task created successfully",
      data: task,
    });
  },
);

/*
GET /tasks
*/
export const getAllTasksController = asyncHandler(
  async (_req: Request, res: Response) => {
    const tasks = await getTasks();

    res.status(200).json({
      message: "Tasks retrieved successfully",
      data: tasks,
    });
  },
);

/*
GET /tasks/:id
*/
export const getTaskByIdController = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.params.id as string;

    if (!id) {
      throw new ApiError(400, "Invalid task id");
    }

    const task = await getTaskById(id);

    if (!task) {
      throw new ApiError(404, "Task not found");
    }

    res.status(200).json({
      message: "Task retrieved successfully",
      data: task,
    });
  },
);

/*
PATCH /tasks/:id
*/
export const updateTaskController = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.params.id as string;

    if (!id) {
      throw new ApiError(400, "Invalid task id");
    }

    const task = await updateTask(id, req.body);

    if (!task) {
      throw new ApiError(404, "Task not found");
    }

    res.status(200).json({
      message: "Task updated successfully",
      data: task,
    });
  },
);

/*
DELETE /tasks/:id
*/
export const deleteTaskController = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.params.id as string;

    if (!id) {
      throw new ApiError(400, "Invalid task id");
    }

    const task = await deleteTask(id);

    if (!task) {
      throw new ApiError(404, "Task not found");
    }

    res.status(200).json({
      message: "Task deleted successfully",
    });
  },
);
