import { connectDB } from "@/lib/db";
import auth from "@/middleware/auth";
import Project from "@/models/ProjectSchema";

export default async function handler(req, res) {
  await connectDB();

  const { id } = req.query;
  //console.log(req.query)

  auth(req, res, async () => {
    try {
      const project = await Project.findById(id);

      if (!project) {
        return res.status(404).json({ message: "project not found" });
      }

      if (project.user.toString() !== req.userId) {
        return res.status(400).json({ message: "no permission" });
      }

      //update project
      if (req.method === "PUT") {
        const { title, description } = req.body;

        const updatedProject = await Project.findByIdAndUpdate(
          id,
          { title, description },
          { new: true }, //return updated document in mongodb
        );

        return res.status(200).json({
          message: "project updated",
          updatedProject,
        });
      }

      //delete project
      if (req.method === "DELETE") {
        await Project.findByIdAndDelete(id);

        return res.status(200).json({
          message: "project deleted",
        });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });
}
