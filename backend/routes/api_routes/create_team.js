const express = require('express');
const router = express.Router();
const db = require('../../db/connection');


// Create Team
router.post('/teams', ({body}, res) => {
    const sql = `Insert Into teams (name, location, poc) VALUES (\'${body.name}\', \'${body.location}\', '\'${body.poc}\')`;

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