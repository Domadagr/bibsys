import express from 'express';
const router = express.Router();
import { login } from '../controllers/authControllers.js';

router.post('/login', login);

/*
router.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    
    // Verify user credentials using your loginHandler
    const isValid = await auth.loginHandler(username, password);
    if (!isValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  
    // Generate token
    const token = await auth.generateAccessToken(username);
  
    // Set the token as an HttpOnly cookie
    res.cookie('token', token, {
      httpOnly: true,
      //secure: process.env.NODE_ENV === 'production', // use HTTPS in production
      sameSite: 'None', // necessary if your frontend and backend run on different origins
    });
  
    res.status(200).json({ message: 'Logged in successfully' });
  });
*/
export default router;