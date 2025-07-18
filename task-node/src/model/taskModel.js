import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  priority: {
    type: String,
     enum: ['low', 'medium', 'high'],
  },
  dueDate: {
    type: Date,
  },
   user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  
  
},{timestamps:true}

);


const Task=mongoose.model("Task",taskSchema);
export default Task;