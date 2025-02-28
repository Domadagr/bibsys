process.env.TZ = 'UTC';


import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ["GET", "POST", "PUT"],
  allowedHeaders: ["Content-Type"],
  credentials: true,
}));

console.log("Server Date:", new Date().toString());


import bookRoutes from './routes/bookRoutes.js';
import authRoutes from './routes/authRoutes.js';
app.use('/api', bookRoutes, authRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log("Server running on port: ", PORT));

export default app;