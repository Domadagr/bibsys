import { check, validationResult } from "express-validator";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import sql from '../config/db.js';
import findUser from '../services/userService.js';
import auth from '../middleware/auth.js';

/*
export const loginHandler = async (findUser, password)  =>  {
    const [verifyUser] = findUser(findUser);

    if (!verifyUser) return false;

    result = await bcrypt.compare(password, verifyUser.password)
    if (!result) return false;
    console.log(result);
    return result;
}
*/

export const login = async (req, res) => {
    await Promise.all([
        check('user').isString().withMessage('Username must be a string').trim().notEmpty().withMessage('Username is required'),
        check('password').isString().withMessage('Password must be a string').trim().notEmpty().withMessage('Password is required'),
    ]);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }
 
    try {
        const user = req.body.user;
        const pw = req.body.password;
        const authorized = await auth.loginHandler(user, pw);
        if (authorized) {
            const token = await auth.generateAccessToken(user);
            //res.status(200).send({ token });
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', 
                sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
                path: '/',
                maxAge: 7200000,
              });
              console.log("res.cookie:", res.cookie.token);
              res.status(200).json({ message: 'Logged in successfully' }).send();
        } else {
            res.status(401).send({ error: "Invalid credentials" });
        }
    } catch (err) {
        console.error("Error: ", err);
        res.status(500).send({ error: "Internal server error" });
    }
}



