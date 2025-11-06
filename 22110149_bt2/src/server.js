import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import webRoutes from "./routes/web.js";

dotenv.config();
connectDB();

const app = express();

// Cấu hình body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Cấu hình EJS
app.set("view engine", "ejs");
app.set("views", "./src/views");

// Routes
app.use("/", webRoutes);

const PORT = process.env.PORT || 8088;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
