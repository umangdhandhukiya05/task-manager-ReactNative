import jwt from "jsonwebtoken";

//auth middleware
export default function auth(req, res, next) {
  const authHeader = req.headers.authorization;

  //not token in header then un authorised
  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //this userid pass to another api where id needed
    req.userId = decoded.userId;

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Invalid token" });
  }
}
