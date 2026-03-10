import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
    },

    status: {
      type: String,
      enum: ["todo", "inProgress", "done"],
      default: "todo",
    },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },

    dueDate: {
      type: Date,
    },

    assignedToUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

export default mongoose.models.Task || mongoose.model("Task", TaskSchema);
