import mongoose, { Schema, Document , Model} from "mongoose";

export type TaskStatus = "pending" | "in-progress" | "done";

export interface Task extends Document {
    title: string;
    description?: string;
    status: TaskStatus;
    createdAt: Date;
    updatedAt: Date;
}
;

const TaskSchema = new Schema<Task>(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            required: false,
            trim: true,
        },

        status: {
            type: String,
            enum: ["pending", "in-progress", "done"],
            default: "pending",
        },
    },
    {
        timestamps: true,
    }
);

export const TaskModel = mongoose.model<Task>("Task", TaskSchema);