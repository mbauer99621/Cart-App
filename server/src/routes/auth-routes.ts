import { Router, type Request, type Response } from 'express';
import { User }  from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

// POST /signup - Register a new user
router.post("/signup", async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email is already in use." });
    }

    //let sequelize hooks handle password hashing
    await User.create({ username, email, password });

    res.status(201).json({ success: true, message: "User registered successfully." });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ success: false, message: "Server error. Please try again." });
  }
});


// export const login = async (req: Request, res: Response): Promise<Response> => {
//   const { username, password } = req.body;
//   console.log("Login attempt for:", username);

// try {
//   const user = await User.findOne({ where: { username } });

//   if (!user) {
//     console.error("User not found:", username);
//     return res.status(401).json({ message: 'Authentication failed: User not found' });
//   }
  
//   console.log("✅ Found user:", user.username);
//   console.log("🔑 Stored hashed password:", user.password);
//   console.log("🔑 Entered password:", password);

//   const passwordIsValid = await bcrypt.compare(password, user.password);
//   if (!passwordIsValid) {
//     console.error("Invalid password for user:", username);
//     return res.status(401).json({ message: 'Authentication failed: Invalid password' });
//   }

//   const secretKey = process.env.JWT_SECRET_KEY;
//   if (!secretKey) {
//     console.error("JWT secret key is missing");
//     return res.status(500).json({ message: "Server error: Missing JWT secret key" });
//   }

//   const token = jwt.sign({ id: user.id, username: user.username, email: user.email }, secretKey, { expiresIn: '12h' });
//   console.log("Login successful, token generated for:", username);

//   if (!token || token.split('.').length !== 3) {
//     console.error("❌ Invalid JWT generated:", token);
//     return res.status(500).json({ message: "Error generating valid token." });
//   }

//   console.log("✅ Login successful, sending token...");
//   console.log("🛠️ Full response being sent:", JSON.stringify({ token }));
//   return res.json({ token });

// } catch (error) {
//   console.error("Error during login:", error);
//   return res.status(500).json({ message: "Internal server error" });
//   }
// };

router.post('/login', async (req, res) => {
  try {
    console.log("🔐 Login request received.");

    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });

    if (!user) {
      console.error("❌ User not found:", username);
      return res.status(401).json({ success: false, message: 'Authentication failed: User not found' });
    }

    console.log("✅ Found user:", user.username);

    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      console.error("❌ Invalid password for user:", username);
      return res.status(401).json({ success: false, message: 'Authentication failed: Invalid password' });
    }

    const secretKey = process.env.JWT_SECRET_KEY;
    if (!secretKey) {
      console.error("❌ Missing JWT Secret Key");
      return res.status(500).json({ message: "Server error: Missing JWT secret key" });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email }, 
      secretKey, 
      { expiresIn: '12h' }
    );

    console.log("✅ Login successful, sending response.");

    // 🚀 Ensure the `user` object is sent in the response
    return res.json({
      success: true,
      message: "Login successful!",
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });

  } catch (error) {
    console.error("❌ Error in login route:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.get("/get-user/:username", authenticateToken, async (req: Request, res: Response) => {
  try {
    const { username } = req.params;
    console.log("🔍 Fetching user:", username);

    const user = await User.findOne({ where: { username } });

    if (!user) {
      console.error("❌ User not found:", username);
      return res.status(404).json({ success: false, message: "User not found" });
    }

    console.log("✅ Found user:", user.username, user.email);
    return res.json({
      success: true,
      username: user.username,
      email: user.email
  });
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});


export default router;
