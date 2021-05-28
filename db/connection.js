//import mysql2 package
const mysql = require('mysql2');


// CONNECT TO DATABASE
const db = mysql.createConnection(
  {
    host: 'localhost',
    // Your MySQL username,
    user: 'root',
    // Your MySQL password
    password: 'WinterWins$1977',
    database: 'election'
  },
  console.log('Connected to the election database.')
);




//EXPORT THE FILE SINCE IT IS NOT IT'S OWN MODULE
module.exports = db;