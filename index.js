const express = require('express');
const app = express();
const path = require('path');
const mysql = require('mysql2/promise');

const port = 3000;

// Database connection details
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'hospital'
};

// Serve the static files in the current directory
app.use(express.static(__dirname));

// Handle requests to the root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle requests to the login page
app.get('/login.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

// Handle requests to the register page
app.get('/CreateAssistant.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'CreateAssistant.html'));
});

// Handle all other requests with a 404 error
app.use((req, res) => {
  res.status(404).send('404 Not Found');
});

// Start the server
app.listen(port, async () => {
  console.log(`Server running at http://localhost:${port}/`);
  try {
    // Create a database connection
    const connection = await mysql.createConnection(dbConfig);
    console.log('Connected to the database');
    // Use the connection for your database operations
    // ...
    connection.end(); // Close the connection when done
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
});
