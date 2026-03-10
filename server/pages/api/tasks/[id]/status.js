import { connectDB } from "@/lib/db";
import Task from "@/models/TaskSchema";
import auth from "@/middleware/auth";

export default async function Patch(req, res) {
  auth(req, res, async () => {
    try {
      await connectDB();

      if (req.method !== "PATCH") {
        return res.status(405).json({ message: "Method not allowed" });
      }

      const { id } = req.query;
      const { status } = req.body;

      if (!status) {
        return res.status(400).json({ message: "Status is required" });
      }

      const task = await Task.findByIdAndUpdate(id, { status }, { new: true });

      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }

      return res.status(200).json({
        message: "Task status updated successfully",
        task,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });
}
