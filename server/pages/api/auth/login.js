import { connectDB } from "@/lib/db";
import User from "@/models/UserSchema";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async function Post(req, res) {
  try {
    await connectDB();

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    return res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
