import { TaskModel } from "../models/task.model";
import { Task } from "../models/task.model";

export const createTask = async (data: Partial<Task>) => {
  const task = await TaskModel.create(data);
  return task;
};

export const getTasks = async (page: number, limit: number) => {
  const skip = (page - 1) * limit;

  const tasks = await TaskModel.find()
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const total = await TaskModel.countDocuments();

  return {
    tasks,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
};

export const getTaskById = async (id: string) => {
  const task = await TaskModel.findById(id);
  return task;
};

export const updateTask = async (id: string, data: Partial<Task>) => {
  const updatedTask = await TaskModel.findByIdAndUpdate(id, data, {
    new: true,
  });

  return updatedTask;
};

export const deleteTask = async (id: string) => {
  const deletedTask = await TaskModel.findByIdAndDelete(id);
  return deletedTask;
};
