import { TaskModel } from "../models/task.model";
import { Task } from "../models/task.model";

export const createTask = async (data: Partial<Task>) => {
  const task = await TaskModel.create(data);
  return task;
};

export const getTasks = async (
  page: number,
  limit: number,
  status?: string,
  sort: "asc" | "desc" = "desc",
) => {
  const skip = (page - 1) * limit;

  // filter
  const filter: any = {};
  if (status) {
    filter.status = status;
  }

  // sort
  const sortOption = {
    createdAt: (sort === "asc" ? 1 : -1) as 1 | -1,
  };

  const tasks = await TaskModel.find(filter)
    .skip(skip)
    .limit(limit)
    .sort(sortOption);

  const total = await TaskModel.countDocuments(filter);

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
