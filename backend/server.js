import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import tasksRouter from "./routes/tasks.js";

await mongoose.connect(process.env.DB_URI);

const app = express();

app.use(express.json());
app.use(cors());
app.use("/app/tasks", tasksRouter);
app.listen("3000", () => console.log("server started on port 3000"));
