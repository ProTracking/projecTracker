const express = require('express');
const router = express.Router();
const db = require('../../db/connection');


// Create Ticket
router.post('/comment', ({body}, res) => {
    const sql = 'Insert Into comments (content, user_id, ticket_id, html) VALUES (' +
                '\'' + body.content + '\',' +
                     + body.user_id + ',' +
                     + body.ticket_id + ',' +
                '\'' + body.html + '\')';

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