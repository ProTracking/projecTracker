const express = require('express');
const db = require('./db');
const routes = require('./routes');
const path = require("path");
const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false})); // Express Middleware

app.use('/api', routes);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build')); // serve the static react app
    app.get('*', (req, res, next) => {
        // Serve index.html file if it doesn't recognize the route
        res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html')); // <- Here !
    });
}

db.connect();

db.query('SELECT NOW()', (err, res) => {
    if (err) throw err;
        console.log('Database Connected.');
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        });
});