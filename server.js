import express from "express";
import dotenv from "dotenv";
import taskRoutes from "./routes/taskRoutes.js";
import connectDB from "./config/db.js";

// .env
dotenv.config();

// MongoDB connection
connectDB();

// Express
const app = express();
app.use(express.json());

// Routes
app.use("/api/tasks", taskRoutes);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
