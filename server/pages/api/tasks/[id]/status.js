import { connectDB } from "@/lib/db";
import Task from "@/models/TaskSchema";
import auth from "@/middleware/auth";

//in this user can only change status
export default async function handler(req, res) {
  auth(req, res, async () => {
    try {
      await connectDB();

      if (req.method !== "PATCH") {
        return res.status(405).json({ message: "Method not allowed" });
      }

      //task id and status
      const { id } = req.query;
      const { status } = req.body;

      if (!status) {
        return res.status(400).json({ message: "Status is required" });
      }

      //check task is there or not
      const task = await Task.findById(id);
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }

      //check role user is owner or assignedUser
      const userId = req.userId;

      if (
        task.createdBy.toString() !== userId &&
        task.assignedToUser?.toString() !== userId
      ) {
        return res.status(403).json({
          message: "You are not allowed to update this task",
        });
      }
      
      task.status = status;
      await task.save();

      return res.status(200).json({
        message: "Task status updated successfully",
        task,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });
}
