import { connectDB } from "@/lib/db";
import Task from "@/models/TaskSchema";
import auth from "@/middleware/auth";

export default async function handler(req, res) {
  auth(req, res, async () => {
    try {
      await connectDB();

      if (req.method === "PUT") {
        const { id } = req.query;

        const {
          title,
          description,
          status,
          priority,
          dueDate,
          assignedToUser,
        } = req.body;

        const task = await Task.findById(id);

        if (!task) {
          return res.status(404).json({ message: "Task not found" });
        }

        const updatedTask = await Task.findByIdAndUpdate(
          id,
          {
            title,
            description,
            status,
            priority,
            dueDate,
            assignedToUser,
          },
          { new: true },
        );

        return res.status(200).json({
          message: "Task updated successfully",
          task: updatedTask,
        });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });
}
