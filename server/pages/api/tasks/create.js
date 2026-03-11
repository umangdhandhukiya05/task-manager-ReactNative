import { connectDB } from "@/lib/db";
import Task from "@/models/TaskSchema";
import auth from "@/middleware/auth";

export default async function Post(req, res) {
  auth(req, res, async () => {
    try {
      await connectDB();

      const { projectId } = req.query;

      console.log(projectId)

      const { title, description, status, priority, dueDate, assignedToUser } =
        req.body;

        console.log(req.body)

      if (!projectId) {
        return res.status(400).json({ message: "projectId is required" });
      }

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
        project: projectId,
        createdBy: req.userId,
      });

      return res.status(201).json({
        message: "task added successfully",
        task,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });
}
