import bcrypt from 'bcrypt';
import sql from '../config/db.js';
import jwt from 'jsonwebtoken';
import { findUser, findUserType, checkUserId } from '../services/userService.js';

// Token generation :: using digitalocean tutorial for JWT
const generateAccessToken = (async (username) => {
    const userId = await findUserType(username);
    const payload = { user: userId }
    return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '120m' });
})

// Authenticate token using express.js middleware
export function authenticateToken(requiredRole) {
    return async (req, res, next) => {
        //const authHeader = req.headers['authorization'];
        //const token = authHeader && authHeader.split(' ')[1];
        
        const token = req.cookies.token;
        console.log("CookieParser: ", req.cookies.token);
       if (!token)
         return res.status(401).json({ message: 'Unauthorized: No token provided' });
   

        if(token == null) return res.status(401).json({ message: 'Unauthorized: No token provided' });

        try {
            const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
            req.user = decoded;
            const userId = decoded.user[0].id;
            const result = await checkUserId(userId);
        
            if (result[0].user_type.length === 0) {
                return res.status(403).json({ message: "User not found."});
            }

            const userRole = result[0].user_type;

            if (requiredRole.length && !requiredRole.includes(userRole)) {
                return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
            }
            next();

        } catch (error) {
            return res.status(403).json({ message: error.message });
        }
    }
};

export const loginHandler = async (username, password)  =>  {
    const verifyUser = await findUser(username);
    if (!verifyUser) return false;

    const result = await bcrypt.compare(password, verifyUser.password)
   // if (!result) return false;
    return result;
}

export default { generateAccessToken, authenticateToken, loginHandler }
