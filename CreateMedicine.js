const express = require('express');
const mysql = require('mysql');
const app = express();

// Set CORS headers to allow cross-domain requests from anywhere
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
});

app.options('*', (req, res) => {
    res.sendStatus(200);
});

app.post('/', (req, res) => {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'hospital'
    });
    const params = new URLSearchParams(req.body);
    const name = params.get('name');
    const price = params.get('price');
    const count = params.get('count');
    const sql = 'INSERT INTO medicine(name, price, count) VALUES (?, ?, ?)';
    const values = [name, price, count];

    connection.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error: ' + err);
            return;
        }
        console.log(result.affectedRows + ' row(s) inserted');
        res.status(200).send('SUCCESSFUL');
    });
});

app.listen(8080, () => {
    console.log('Server listening on port 8080');
});
