import Task from "../models/Task.js";

// Get all tasks
const getAllTasks = async (req, res) => {
  try {
    const filter = {};
    if (req.query.status) {
      filter.status = req.query.status;
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const totalTasks = await Task.countDocuments(filter);
    const tasks = await Task.find(filter).skip(skip).limit(limit);

    res.json({
      page,
      limit,
      totalTasks,
      totalPages: Math.ceil(totalTasks / limit),
      tasks,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Get one task by ID
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (task) {
      res.json(task);
    } else {
      res.status(404).json({ error: "Task not found" });
    }
  } catch (err) {
    res.status(400).json({ error: "Invalid ID" });
  }
};

// Create new task
const createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    if (!title) {
      return res.status(400).json({ error: "Title is required." });
    }

    const task = new Task({ title, description, status });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Update task
const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (task) {
      res.json(task);
    } else {
      res.status(404).json({ error: "Task not found" });
    }
  } catch (err) {
    res.status(400).json({ error: "Invalid ID" });
  }
};

// Delete task
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (task) {
      res.json({ message: "Task deleted" });
    } else {
      res.status(404).json({ error: "Task not found" });
    }
  } catch (err) {
    res.status(400).json({ error: "Invalid ID" });
  }
};

export default {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
