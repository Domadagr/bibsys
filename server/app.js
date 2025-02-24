import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
});

import bookRoutes from './routes/bookRoutes.js';
import authRoutes from './routes/authRoutes.js';
app.use('/api', bookRoutes, authRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log("Server running on port: ", PORT));

export default app;