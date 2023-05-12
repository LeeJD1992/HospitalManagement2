const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'hospital'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database');
});

app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  try {
    connection.query('SELECT * FROM medicine', (error, results) => {
      if (error) {
        console.error(error);
        res.write('<h1 align=center><font color="red">TRY AGAIN<br></font></h1>');
        res.end();
        return;
      }
      const rows = results.map(row => {
        return `
          <tr>
            <td></td>
            <td>${row.mid}</td>
            <td>${row.name}</td>
            <td>${row.price}</td>
            <td>${row.count}</td>
          </tr>
        `;
      }).join('');
      const html = `
        <table>
          <tr>
            <th>mid</th>
            <th>name</th>
            <th>price</th>
            <th>count</th>
          </tr>
          ${rows}
        </table>
      `;
      res.write(html);
      res.end();
    });
  } catch (error) {
    console.error(error);
    res.write('<h1 align=center><font color="red">TRY AGAIN<br></font></h1>');
    res.end();
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
