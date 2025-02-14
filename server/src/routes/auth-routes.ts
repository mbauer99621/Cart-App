import { Router, type Request, type Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  console.log("Login attempt for:", username);

try {
  const user = await User.findOne({
    where: { username },
  });

  if (!user) {
    console.error("User not found:", username);
    return res.status(401).json({ message: 'Authentication failed: User not found' });
  }
  
  console.log("✅ Found user:", user.username);
  console.log("🔑 Stored hashed password:", user.password);
  console.log("🔑 Entered password:", password);

  const passwordIsValid = await bcrypt.compare(password, user.password);
  if (!passwordIsValid) {
    console.error("Invalid password for user:", username);
    return res.status(401).json({ message: 'Authentication failed: Invalid password' });
  }

  const secretKey = process.env.JWT_SECRET_KEY || '';
  if (!secretKey) {
    console.error("JWT secret key is missing");
    return res.status(500).json({ message: "Server error: Missing JWT secret key" });
  }

  const token = jwt.sign({ username }, secretKey, { expiresIn: '12h' });
  console.log("Login successful, token generated for:", username);
  return res.json({ token });
  
} catch (error) {
  console.error("Error during login:", error);
  return res.status(500).json({ message: "Internal server error" });
  }
};

const router = Router();

// POST /login - Login a user
router.post('/LoginPage', login);

export default router;
