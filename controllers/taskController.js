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
      succes : true,
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


module.exports = {
  createTask,
  getTasks,
}