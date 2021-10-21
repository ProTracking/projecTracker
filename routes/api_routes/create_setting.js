const express = require('express');
const router = express.Router();
const db = require('../../db/connection');


// Create Setting
router.post('/settings', ({body}, res) => {
    const sql = `Insert Into settings (lang, slug, value, "default") VALUES (\'${body.lang}\', \'${body.slug}\', \'${body.value}\', \'${body.default}\')`;
    console.log(sql)
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