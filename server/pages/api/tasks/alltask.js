import { connectDB } from "@/lib/db";
import Task from "@/models/TaskSchema";
import auth from "@/middleware/auth";
import User from "@/models/UserSchema";
import mongoose from "mongoose";

export default async function Get(req, res) {
  auth(req, res, async () => {
    try {
      await connectDB();

      const { status, priority, search, projectId } = req.query;

      //show task according project
      if (!projectId) {
        return res.status(400).json({ message: "projectId is required" });
      }

      //filter according search,priority or status also check user is creator or not
      const filter = {
        project: new mongoose.Types.ObjectId(projectId),
        $or: [{ createdBy: req.userId }, { assignedToUser: req.userId }],
      };

      if (status) filter.status = status;
      if (priority) filter.priority = priority;

      if (search) {
        filter.$and = [
          {
            $or: [
              { title: { $regex: search, $options: "i" } },
              { description: { $regex: search, $options: "i" } },
            ],
          },
        ];
      }

      //find task then send response along with assignedTOuse is
      const tasks = await Task.find(filter)
        .populate("assignedToUser", "name email")
        .sort({ createdAt: -1 });

      return res.status(200).json({
        message: "tasks fetched successfully",
        tasks,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });
}
