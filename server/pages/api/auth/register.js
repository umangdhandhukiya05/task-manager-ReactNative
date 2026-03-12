import { connectDB } from "@/lib/db";
import User from "@/models/UserSchema";
import bcrypt from "bcryptjs";

//register new user
export default async function Post(req, res) {
  try {
    await connectDB();

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User created",
      user,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
