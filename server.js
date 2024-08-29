const express = require('express');
const colors = require('colors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const mySqlPool = require('./config/db');

//load env variables
dotenv.config();

//rest object
const app = express();

//middleware
app.use(express.json());
app.use(morgan('dev'));

//routes
app.use('/api/v1/notes', require('./routes/notesRoutes'));

app.get('/test', (req, res) => {
    res.status(200).send('<h1>Notes CRUD App</h1>');
})

//port
const port = process.env.PORT || 8000;

//conditionally listen
mySqlPool.query('SELECT 1').then(() => {
    //MySQL
    console.log('MySQL connected...'.bgCyan.white);
    //listen
    app.listen(port, () => {
        console.log(`Server running on port ${process.env.PORT}`.bgMagenta.white);
    });
}).catch((error) => {
    console.log(error);
})
