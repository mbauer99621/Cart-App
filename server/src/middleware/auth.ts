import type { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt, {JwtPayload as OriginalJwtPayload} from 'jsonwebtoken';

interface JwtPayload extends OriginalJwtPayload{
  username: string;
  email: string;
}

declare module 'express-serve-static-core' {
  interface Request {
    user?: JwtPayload;
  }
}

export const authenticateToken:RequestHandler = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    console.log('❌ No Authorization header provided');
    res.status(401).json({ message: 'Access Denied: No token provided' });
    return;
  }
    const token = authHeader.split(' ')[1];

    const secretKey = process.env.JWT_SECRET_KEY;
    if (!secretKey) {
      console.error('❌ Missing JWT Secret Key in environment variables');
      res.status(500).json({ message: 'Server Error: Missing JWT secret key' });
      return;
    }

    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        console.error('❌ Invalid Token:', err.message);
        return res.sendStatus(403); // Forbidden
      }

      const userData = decoded as JwtPayload;
      req.user = { username: userData.username, email: userData.email }; // Ensure both fields exist
      console.log('✅ Token Verified:', req.user);
      next();
      return;
    }); 
};
