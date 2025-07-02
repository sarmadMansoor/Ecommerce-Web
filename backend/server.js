import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/mongodb.js';
import productRouter from './router/productRouter.js';
import userRouter from './router/userRouter.js'; // ✅ import your userRouter

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/product', productRouter);
app.use('/api/user', userRouter); // ✅ mount the user routes

// Default Route
app.get('/', (_req, res) => {
  res.send("Welcome to the backend server!");
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
