require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');
const studentRoutes = require('./src/routes/studentRoutes');
const checkInRoutes = require('./src/routes/checkInRoutes'); // <-- ADD THIS

const app = express();

app.use(express.json());
app.use(cors());

connectDB();

app.use('/api/students', studentRoutes);
app.use('/api/checkins', checkInRoutes); // <-- ADD THIS

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));