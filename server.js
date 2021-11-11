const express = require('express');
require('dotenv').config()
const db = require('./db/connection');
const api_routes = require('./routes/api_routes');
const PORT = process.env.port || 3001;


const app = express(); // Instantiating Express Server
app.use(express.urlencoded({extended:false})); // Express Middleware
app.use(express.json()); // Express Middleware
app.use('/api', api_routes)

// Default Response
app.use((req,res) => {
    res.status(404).end()
})

// Dummy Obj
const character = {
    name:'Jane',
    role:'Engineer',
    age:25
};

app.get('/api/character',(req,res) => {
    res.json(character)
})

// Connect to Database Server
db.connect();
db.query('SELECT NOW()', (err, res) => {

    if (err) throw err;
    console.log('Database Connected.');

    app.listen(process.env.PORT ||PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });

    // db.end()
});



