// configure dotenv file
require('dotenv').config();

// import modules
const express = require('express');
const app=express()
const userRoutes=require('./routes/user')
const db = require('./config/mongoose.js');
const bodyParser = require('body-parser');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db()

app.use('/api/users', userRoutes);

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
  });


const port = process.env.PORT || 8000; // Ensure port is defined

app.listen(port, err => {
    if (err) {
        console.error('Error connecting to the server:', err);
    } else {
        console.log(`Server successfully connected at http://localhost:${port}`);
    }
});
