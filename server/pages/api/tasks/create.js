import { connectDB } from "@/lib/db";
import Task from "@/models/TaskSchema";
import auth from "@/middleware/auth";

export default async function Post(req, res) {
  auth(req, res, async () => {
    try {
      await connectDB();

      const { title, description, status, priority, dueDate, assignedToUser } =
        req.body;

      if (!title || !description || !dueDate || !assignedToUser) {
        return res.status(400).json({ message: "all fields required" });
      }

      const task = await Task.create({
        title,
        description,
        status: status || "todo",
        priority: priority || "Medium",
        dueDate,
        assignedToUser,
        createdBy: req.userId,
      });

      return res.status(200).json({ message: "task added successfully", task });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });
}
