import { connectDB } from "@/lib/db";
import User from "@/models/UserSchema";
import jwt from "jsonwebtoken";

//return current user profile
export default async function Get(req, res) {

  try {
    await connectDB();

    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      user,
    });
    
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
}
