import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res
      .status(400)
      .json({ success: false, message: "Unauthorized - no token found" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decoded) {
      return res
        .status(400)
        .json({ success: false, message: "Unauthroizd - invalid token" });
    }

    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log("Error in verifyToken middleware", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
