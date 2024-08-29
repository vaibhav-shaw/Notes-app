const mysql = require('mysql2/promise');

const mySqlPool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Vaibhav@2606',
    database: 'notes_db'
});

module.exports = mySqlPool;