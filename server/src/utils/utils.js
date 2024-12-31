import jwt from "jsonwebtoken";

export const tokenGenerator = (userId, res) => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY is not defined in the environment variables.");
  }

  const token = jwt.sign({ userId }, process.env.JWT_KEY, {
    expiresIn: "3d",
  });

  // Determine if the app is running on localhost
  const isLocalhost = process.env.NODE_ENV !== "production";

  res.cookie("token", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true,
    sameSite: isLocalhost ? "Strict" : "Lax", // Use Strict for localhost, Lax for production
    secure: !isLocalhost, // Secure only in production (not for localhost)
  });

  return token;
};
