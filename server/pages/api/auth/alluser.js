import { connectDB } from "@/lib/db";
import auth from "@/middleware/auth";
import User from "@/models/UserSchema";

export default async function Get(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  await connectDB();

  auth(req, res, async () => {
    try {
      const users = await User.find({}).select("_id name").lean();

      return res.status(200).json({
        success: true,
        users,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  });
}
