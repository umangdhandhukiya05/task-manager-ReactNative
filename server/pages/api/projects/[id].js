import { connectDB } from "@/lib/db";
import auth from "@/middleware/auth";
import Project from "@/models/ProjectSchema";

export default async function handler(req, res) {
  await connectDB();

  const { id } = req.query;

  auth(req, res, async () => {
    try {
      //first check project is available or not
      const project = await Project.findById(id).populate("user", "name email");

      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }

      // get single project
      if (req.method === "GET") {
        return res.status(200).json({
          project,
        });
      }

      // update project
      if (req.method === "PUT") {
        if (project.user._id.toString() !== req.userId) {
          return res.status(403).json({ message: "No permission" });
        }

        const { title, description } = req.body;

        const updatedProject = await Project.findByIdAndUpdate(
          id,
          { title, description },
          { new: true },
        ).populate("user", "name email");

        return res.status(200).json({
          message: "Project updated",
          project: updatedProject,
        });
      }

      // delete project
      if (req.method === "DELETE") {
        if (project.user._id.toString() !== req.userId) {
          return res.status(403).json({ message: "No permission" });
        }

        await Project.findByIdAndDelete(id);

        return res.status(200).json({
          message: "Project deleted",
        });
      }

      return res.status(405).json({ message: "Method not allowed" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });
}
