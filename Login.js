const express = require('express');
const mysql = require('mysql');
const querystring = require('querystring');
const fs = require('fs');
const dateFormat = require('dateformat');
const port = 3000;

const app = express();

// MySQL DB Connection
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "hospital"
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
      console.log(err);
      res.setHeader('Content-Type', 'text/html');
      res.write("<br><br><br><h1 align=center><font color=\"red\">TRY AGAIN<br>REDIRECTING BACK REGISTRATION PAGE</font></h1><script type=\"text/javascript\">");
      res.write("redirectURL = \"/CreateAssistant.html\";setTimeout(\"location.href = redirectURL;\",\"5000\");");
      res.write("</script>");
      return res.end();
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
      console.log(err);
      res.setHeader('Content-Type', 'text/html');
      res.write("<br><br><br><h1 align=center><font color=\"red\">TRY AGAIN<br>REDIRECTING BACK LOGIN PAGE</font></h1><script type=\"text/javascript\">");
      res.write("redirectURL = \"/login.html\";setTimeout(\"location.href = redirectURL;\",\"5000\");");
      res.write("</script>");
      return res.end();
    }
    if (result.length > 0) {
      res.redirect('/welcome.html');
    } else {
      res.redirect('/login.html');
    }
  });
});

// 404 error handling
app.use((req, res) => {
  res.status(404).sendFile(__dirname + '/404.html');
});

// Server Listening
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
