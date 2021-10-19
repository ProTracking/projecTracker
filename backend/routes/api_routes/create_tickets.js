const express = require('express');
const router = express.Router();
const db = require('../../db/connection');


// Create Ticket
router.post('/ticket', ({body}, res) => {
    const sql = "INSERT INTO ticket (subject, content, html, priority, user_id) VALUES (?,?,?,?,?)";
    const param = [body.subject, body.content, body.html, body.priority, body.user_id];
    console.log(param);
    console.log(sql)
    db.query(sql, param, (err, result) => {
        console.log(err);
        if(err) {
            res.status(400).json({
                error:err.message
            });
            return;
        }
        console.log(sql);
        console.log(body);
        res.json({
            message: 'Success',
            data: body
        });
    });
});

module.exports = router;
