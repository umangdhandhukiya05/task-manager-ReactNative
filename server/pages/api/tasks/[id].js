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

        const updatedTask = await Task.findOneAndUpdate(
          { _id: id, createdBy: req.userId }, // security check
          {
            title,
            description,
            status,
            priority,
            dueDate,
            assignedToUser,
          },
          { new: true }
        );

        if (!updatedTask) {
          return res.status(404).json({ message: "Task not found" });
        }

        return res.status(200).json({
          message: "Task updated successfully",
          task: updatedTask,
        });
      }

      return res.status(405).json({ message: "Method not allowed" });

    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });
}