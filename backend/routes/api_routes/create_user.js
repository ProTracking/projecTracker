const express = require('express');
const router = express.Router();
const db = require('../../db/connection');


// Create User
router.post('/createUser', ({body}, res) => {
    const sql = 'Insert Into users (protracking_admin, username, password, email, team_id) VALUES (' +
                       body.protracking_admin + ',' +
                '\'' + body.username + '\',' +
                '\'' + body.password + '\',' +
                '\'' + body.email + '\',' +
                       body.team_id + ')';

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