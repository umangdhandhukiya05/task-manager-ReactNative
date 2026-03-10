import { connectDB } from "@/lib/db";
import Task from "@/models/TaskSchema";
import auth from "@/middleware/auth";

export default async function Get(req, res) {
  auth(req, res, async () => {
    try {
      await connectDB();

      const { status, priority, search } = req.query;

      const filter = {};

      if (status) filter.status = status;
      if (priority) filter.priority = priority;

      if (search) {
        filter.$or = [
          { title: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
        ];
      }

      const tasks = await Task.find(filter);

      return res.status(200).json({
        message: "tasks fetched successfully",
        tasks,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });
}
