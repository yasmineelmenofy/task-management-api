import { Request, Response } from "express";
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
export const createTaskController = async (req: Request, res: Response) => {
  try {
    const task = await createTask(req.body);

    res.status(201).json({
      message: "Task created successfully",
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create task",
      error,
    });
  }
};

/*
GET /tasks
Get All Tasks
*/
export const getAllTasksController = async (req: Request, res: Response) => {
  try {
    const tasks = await getTasks();

    res.status(200).json({
      message: "Tasks retrieved successfully",
      data: tasks,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve tasks",
      error,
    });
  }
};

/*
GET /tasks/:id
Get Single Task
*/
export const getTaskByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id || Array.isArray(id)) {
      return res.status(400).json({
        message: "Invalid task id",
      });
    }

    const task = await getTaskById(id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json({
      message: "Task retrieved successfully",
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve task",
      error,
    });
  }
};

/*
PATCH /tasks/:id
Update Task
*/
export const updateTaskController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id || Array.isArray(id)) {
      return res.status(400).json({
        message: "Invalid task id",
      });
    }

    const task = await updateTask(id, req.body);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json({
      message: "Task updated successfully",
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update task",
      error,
    });
  }
};

/*
DELETE /tasks/:id
Delete Task
*/
export const deleteTaskController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id || Array.isArray(id)) {
      return res.status(400).json({
        message: "Invalid task id",
      });
    }

    const task = await deleteTask(id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete task",
      error,
    });
  }
};