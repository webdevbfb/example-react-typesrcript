import express from "express";
import Task from "../models/Task.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const limit = 10; 
  const page = parseInt(req.query.page) || 1; 
  const skipAmount = (page - 1) * limit;

 
  let sortField = "title"; 
  let sortDirection = "asc"; 

  if (req.query.sortField) {
    sortField = req.query.sortField;
  }
  if (req.query.sortDirection === "desc") {
    sortDirection = "desc";
  }

  try {
    const tasks = await Task.find()
      .sort({ [sortField]: sortDirection }) 
      .skip(skipAmount) 
      .limit(limit); 

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
    const {title, description, priority, status} = req.body;

    if (!title || !description || !priority || !status) {
        return res.status(400).json({error: 'Invalid Task'});
      }
    try {
        const task = await Task.create({
            title,
            description,
            priority,
            status,
          })
      res.status(201).json(task);
  } catch (error) {
       res.status(500).json({error: error.message})
 }
})

router.put("/:id", async (req, res) => {
    try {
      const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!task) {
        return res.status(404).json({ error: "Task not found" });
      }
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.delete("/:id", async (req, res) => {
    try {
      const task = await Task.findByIdAndDelete(req.params.id);
      if (!task) {
        return res.status(404).json({ error: "Task not found" });
      }
      res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

export default router;