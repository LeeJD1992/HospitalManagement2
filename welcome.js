const express = require('express');
const mysql = require('mysql');
const dateFormat = require('dateformat');

const app = express();
const port = 3000;

// MySQL DB Connection
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "hospital"
});

// Connect to MySQL
con.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

// Parsing middleware
app.use(express.urlencoded({ extended: true }));

// Route for creating a new assistant
app.post('/CreateAssistant', (req, res) => {
  const { name, email, phone, pwd } = req.body;
  const joindate = dateFormat(new Date(), "yyyy-mm-dd");

  const sql = "INSERT INTO assistant(name,email,phone,joindate,password) VALUES(?,?,?,?,?)";
  const values = [name, email, phone, joindate, pwd];

  // Executing SQL
  con.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error creating assistant:', err);
      res.sendFile(__dirname + '/CreateAssistant.html');
      return;
    }
    res.redirect('/welcome.html');
  });
});

// Route for handling login
app.post('/login', (req, res) => {
  const { email, pwd } = req.body;

  const sql = "SELECT * FROM assistant WHERE email = ? AND password = ?";
  const values = [email, pwd];

  // Executing SQL
  con.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error logging in:', err);
      res.sendFile(__dirname + '/login.html');
      return;
    }
    if (result.length > 0) {
      res.redirect('/welcome.html');
    } else {
      res.redirect('/login.html');
    }
  });
});

// Serve static files
app.use(express.static(__dirname));

// 404 error handling
app.use((req, res) => {
  res.status(404).sendFile(__dirname + '/404.html');
});

// Server Listening
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
