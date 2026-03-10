import { connectDB } from "@/lib/db";
import auth from "@/middleware/auth";
import Project from "@/models/ProjectSchema";

export default async function Post(req, res) {
  await connectDB();

  //add new project
  if (req.method === "POST") {
    auth(req, res, async () => {
      try {
        const { title, description } = req.body;

        if (!title || !description) {
          return res.status(400).json({ message: "All fields required" });
        }

        const project = await Project.create({
          title,
          description,
          user: req.userId,
        });

        return res.status(201).json({
          message: "Project created",
          project,
        });
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
    });
  }
}
