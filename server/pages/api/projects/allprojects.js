import { connectDB } from "@/lib/db";
import Project from "@/models/ProjectSchema";

//fetch all projects
export default async function Get(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  await connectDB();

  try {
    // query params
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";
    const sort = req.query.sort || "createdAt";

    const skip = (page - 1) * limit;

    //search condition
    const searchQuery = {
      title: { $regex: search, $options: "i" },
    };

    //get projects
    const projects = await Project.find(searchQuery)
      .populate("user", "_id name email")
      .sort({ [sort]: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Project.countDocuments(searchQuery);

    return res.status(200).json({
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      projects,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
