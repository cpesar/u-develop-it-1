//import mysql2 package
const mysql = require('mysql2');

// import express
const express = require('express');

// port designation and app expression
const PORT = process.env.PORT || 3001;
const app = express();

// Add Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


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

                  // RETURNS ALL CANDIDATES
// db.query(`SELECT * FROM candidates`, (err, rows) => {
//   console.log(rows);
// });

                    // GET A SINGLE CANDIDATE
                    //insert where id = __
db.query(`SELECT * FROM candidates WHERE id = 4`, (err, row) => {
  if (err) {
    console.log(err);
  }
  console.log(row);
});


                      // DELETE A CANDIDATE
// db.query(`DELETE FROM candidates WHERE id = ?`, 1, (err, result) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(result);
// });


                        // CREATE A CANDIDATE
      // The PRIMARY KEY constraint protects the table from creating duplicate id's
const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected) 
              VALUES (?,?,?,?)`;
const params = [1, 'Ronald', 'Firbank', 1];

db.query(sql, params, (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log(result);
});


          // Default response for any other request (Not Found)
            //HANDLES USER REQUESTS THAT AREN'T SUPPORTED BY THE APP
app.use((req, res) => {
  res.status(404).end();
});


            // FUNCTION TO TEST THAT THE APP IS WORKING
// app.get('/', (req, res) => {
//   res.json({
//     message: 'Hello World'
//   });
// });


// function to start express.js on port 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});