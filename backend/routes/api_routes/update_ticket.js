const express = require('express');
const router = express.Router();
const db = require('../../db/connection');


// Update Ticket
router.put('/ticket/:id', (req, res) => {
    const sql = 'UPDATE ticket SET ' +
        + req.body.id + ' = ' + body.val
        + 'WHERE ';
    const params = [req.body.var, req.body.val]

    db.query(sql, params,  (err, result) => {
        if (err) {
            res.status(400).json({
                error: err.message
            });
        } else if (!result.affectedRows) {
            res.json({ message: 'Ticket not found' });
        } else {
            res.json({
                message: 'Success',
                data: body,
                changes: result.affectedRows
            });
        }
    });
});

module.exports = router;
