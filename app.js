const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const app = express();

dotenv.config();
connectDB();

app.use(express.json());

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

app.use('/api/auth' , authRoutes);
app.use('/api/tasks' , taskRoutes);

app.get("/" , (req,res) => {
  res.send("TaskFlow API is Running...")
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});

