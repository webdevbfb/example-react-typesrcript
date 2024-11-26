import express from "express";
import { connect } from "./db.js";
import taskRouter from "./routes/tasks.js";
import mongoose from "mongoose";

await connect();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use("/api/tasks", taskRouter)

app.listen(port, () => console.log("Sever satrtet on port", port))