const express = require('express');
const router = express.Router();
const db = require('../../db/connection');


// Create Ticket
router.post('/ticket', ({body}, res) => {
    const param = [body.subject, body.content, body.html, body.priority, body.user_id];
    const sql = 'INSERT INTO ticket (subject,content,html,priority,user_id) VALUES (' +
                '\'' + body.subject + '\',' +
                '\'' + body.content + '\',' +
                '\'' + body.html + '\',' +
                '\'' + body.priority + '\',' +
                       (body.user_id).toString() + ')';

    db.query(sql, (err, result) => {
        if(err) {
            res.status(400).json({
                error:err.message
            });
            return;
        }
        res.json({
            message: 'Success',
            data: body
        });
    });
});

module.exports = router;
