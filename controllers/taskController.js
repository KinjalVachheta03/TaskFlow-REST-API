const Task = require("../models/Task");

// ================= Create Task =================
const createTask = async (req, res) => {
  try{
    const {title , description , status} = req.body;

    if(!title || !description){
      return res.status(400).json({
        success : false,
        message : "Title and Description are required",
      });
    }

    const task = await Task.create({
      title,
      description,
      status,
      user : req.user._id,
    });

    res.status(201).json({
      success : true,
      message : "Task Created Successfully",
      task,
    });

  } catch(error){
    res.status(500).json({
      success : false,
      message : error.message,
    });
  }
};


// ================= Get all Task =================

const getTasks = async (req,res) =>{
  try{
    const tasks = await Task.find({ user: req.user._id});

    res.status(200).json({
      success : true,
      count : tasks.length,
      tasks,
    });
  }catch (error){
    res.status(500).json({
      success : false,
      message : error.message,
    });
  }
}

// ================= Get Single Task =================
// ================= Get Single Task =================
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    // Check if task exists
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    // Check if task belongs to logged-in user
    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to access this task",
      });
    }

    res.status(200).json({
      success: true,
      task,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ================= Update Task =================
const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    // Check if task exists
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    // Check ownership
    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this task",
      });
    }

    // Update task
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Task Updated Successfully",
      task: updatedTask,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ================= Delete Task =================
const deleteTask = async (req, res) => {
  try {
    // Find task
    const task = await Task.findById(req.params.id);

    // Check if task exists
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    // Check ownership
    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this task",
      });
    }

    // Delete task
    await Task.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Task Deleted Successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
}