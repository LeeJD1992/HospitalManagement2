const express = require('express');
const { getConnection } = require('./db');

const app = express();
const port = 3000;

app.get('/RetrievePatientsDID', async (req, res) => {
  try {
    const connection = await getConnection();
    const did = req.query.did;
    const sql = `SELECT patients, name FROM doctor WHERE did = ${did}`;

    const [results] = await connection.query(sql);
    const row = results[0];
    const pList = row.patients.split(',');
    const name = row.name;

    const [patientResults] = await connection.query('SELECT * FROM patient');
    const rms = patientResults.metaData;

    res.set('Content-Type', 'text/html');
    res.write(`
      <style>
        table {
          font-family: arial, sans-serif;
          border-collapse: collapse;
          width: 100%;
        }
        td, th {
          border: 1px solid #dddddd;
          text-align: left;
          padding: 8px;
        }
        tr:nth-child(even) {
          background-color: #dddddd;
        }
      </style>
      <h2>List of all the Patients working under: ${name}</h2>
      <table>
        <tr>
          <th>${rms.getColumnName(1)}</th>
          <th>${rms.getColumnName(2)}</th>
          <th>${rms.getColumnName(3)}</th>
          <th>${rms.getColumnName(4)}</th>
          <th>${rms.getColumnName(5)}</th>
          <th>${rms.getColumnName(6)}</th>
          <th>${rms.getColumnName(7)}</th>
          <th>${rms.getColumnName(8)}</th>
          <th>${rms.getColumnName(9)}</th>
          <th>${rms.getColumnName(10)}</th>
          <th>${rms.getColumnName(11)}</th>
        </tr>
    `);

    for (const p of pList.filter(p => parseInt(p) >= 0)) {
      const [patientResult] = await connection.query(`SELECT * FROM patient WHERE pid = ${p}`);
      const patientRow = patientResult[0];
      res.write(`
        <tr>
          <td>${patientRow[1]}</td>
          <td>${patientRow[2]}</td>
          <td>${patientRow[3]}</td>
          <td>${patientRow[4]}</td>
          <td>${patientRow[5]}</td>
          <td>${patientRow[6]}</td>
          <td>${patientRow[7]}</td>
          <td>${patientRow[8]}</td>
          <td>${patientRow[9]}</td>
          <td>${patientRow[10]}</td>
          <td>${patientRow[11]}</td>
        </tr>
      `);
    }

    res.write(`</table>`);
    res.end();
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
