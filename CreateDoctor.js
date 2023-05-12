const express = require('express');
const router = express.Router();
const { getConnection } = require('../database');

router.post('/CreateDoctor', async (req, res) => {
    try {
        const con = await getConnection();
        const params = new URLSearchParams(req.body);
        const name = params.get('name');
        const email = params.get('email');
        const phone = params.get('phone');
        const age = params.get('age');
        const joindate = new Date().toISOString().slice(0, 10);
        const sal = params.get('sal');
        const spec = params.get('spec');
        const patients = "-1";
        const sql = "INSERT INTO doctor(name, email, phone, age, joindate, salary, specialist, patients) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        const queryResult = await con.execute(sql, [name, email, phone, age, joindate, sal, spec, patients]);
        
        if (queryResult[0].affectedRows === 1) {
            res.status(200).send("<br><br><br><h1 align=center><font color=\"green\">SUCCESSFUL<br></font></h1><script type=\"text/javascript\"></script>");
        } else {
            res.status(500).send("<br><br><br><h1 align=center><font color=\"red\">THERE IS SOME PROBLEM<br></font></h1><script type=\"text/javascript\"></script>");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

module.exports = router;
