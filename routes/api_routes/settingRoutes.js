const express = require('express');
const router = express.Router();
const db = require('../../db/connection');


// Create Setting
router.post('/setting', ({body}, res) => {
    const sql = `Insert Into settings (lang, slug, value, "default") VALUES (\'${body.lang}\', \'${body.slug}\', \'${body.value}\', \'${body.default}\');`;
    
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

// Get all settings from DB
router.get('/settings', (req,res) => {
    const sql = `select * from settings;`;
    db.query(sql,(err,rows) => {
        if(err) {
            res.status(500).json({
                error:err.message
            });
            return;
        }
        res.json({
            message: 'Success',
            data: rows
        });
    });
});

// Get setting with id
router.get('/setting/:id' , (req,res) => {
    const sql = `select * from settings where id = ${req.params.id}`;
    
    db.query(sql, (err,rows) => {
        
        if(err) {
            res.status(400).json({
                error: err.message
            });
            return;
        }
        res.json({
            message: 'Success',
            data: rows
        });
    });
});


module.exports = router;