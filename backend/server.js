import 'dotenv/config';          // load .env first
import express from 'express';
import cors from 'cors';

import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './router/userRouter.js';

const app = express();
const port = process.env.PORT || 4000;

// Connect to MongoDB and Cloudinary
connectDB();
connectCloudinary();

app.use(express.json());
app.use(cors());

app.use('/api/user',userRouter);

app.get('/', (_req, res) => res.send("Welcome boss"));

app.listen(port, () => {
  console.log(`🚀 Server started on http://localhost:${port}`);
});
