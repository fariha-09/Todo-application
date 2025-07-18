import Task from "../model/taskModel.js";

export const getAllTask = async (req, res) => {
  try {
    const getAllTasks = await Task.find({ user: req.user._id });
    res.send(getAllTasks);

  } catch (error) {
    res.status(500).json({
      message: "error fetching remote OK tasks...",
    });
  }
};

export const addTask = async (req, res) => {
  try {
    const { title, description, completed, priority, dueDate } = req.body;
    const newTask = new Task({
      title,
      description,
      completed,
      priority,
      dueDate,
       user: req.user._id,
    });
    console.log("req.body is",req.body);
    console.log("🔐 Authenticated user:", req.user);
    await newTask.save();
    res.status(201).json({
      message: "Task added successfully.",
      data: newTask,
    });
  } catch (error) {
      console.error("❌ Backend Error adding task:", error.message);
    res.status(500).json({
      message: "Error adding new task.",
      error: error,
    });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTask = await Task.findByIdAndDelete(id);
    res.status(200).json({
      message: "Task deleted successfully.",
      data: deletedTask,
       user: req.user._id, 
    });
  } catch (error) {
    res.status(500).json({
      message: "error deleting task..",
      error: error,
    });
  }
};

export const updateTask=async(req,res)=>{
    try {
        const {id}=req.params;
        const { title, description, completed, priority, dueDate } = req.body;

        const isTask= await Task.findOne({
      _id: id,
      user: req.user._id,
    });
        if(!isTask){
            return res.status(400).json({
                message:"Task not found.Kindly enter correct id."
            })
        }

        isTask.title=title;
        isTask.description=description;
        isTask.completed=completed;
        isTask.priority=priority;
        isTask.dueDate=dueDate;


        const updateTask = await isTask.save();
         res.status(200).json({
      message: "Task updated successfully.",
      data: updateTask,
      
    });
    } catch (error) {
         res.status(500).json({
      message: "error updating task..",
      error: error,
    });
    }
}


export const getAllTasksForAdmin = async (req, res) => {
  try {
    const tasks = await Task.find(); // fetch all tasks without filtering by user
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching all tasks for admin.",
      error,
    });
  }
};