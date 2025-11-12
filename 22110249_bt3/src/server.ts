import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./config/db";
import userRoutes from "./routes/user.route";

dotenv.config();
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

// Routes
app.use("/", userRoutes);

// Kết nối DB và chạy server
connectDB();
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`=> Server running at http://localhost:${PORT}`));