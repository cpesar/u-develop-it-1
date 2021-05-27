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






            // GET ROUTE- RETURNS ALL CANDIDATES
            // /api/candidates = endpoint
app.get('/api/candidates', (req, res) => {
  const sql = `SELECT * FROM candidates`;

  db.query(sql, (err, rows) => {
    if(err) {
      // instead of logging the error, we'll send a 500 code (server error)
      // place the error msg in a JSON object
      res.status(500).json({ error: err.message });
      return;
    }
      // if there is no error, error is null
      // and the response is sent back using the following statement:
    res.json({
      message: 'success',
      data: rows
    });
  });
});





            // GET ROUTE FOR A SINGLE CANDIDATE
      // the endpoint (/api/candidate), now has an id to specify which candidate we'll get from the database
app.get('/api/candidate/:id', (req, res) => {
  const sql = `SELECT * FROM candidates WHERE id = ?`;
  //params is assigned as an array with a single element (req.params.id)
  const params = [req.params.id];

  //the database call will query the candidates table with this id and retrieve the specified row
  db.query(sql, params, (err, row) => {
    if (err){
      //400 error indicates a user request error
      res.status(400).json({ error: err.message });
      return;
    }
    res.json ({
      message: 'success',
      data: row
    });
  });
});


                      // DELETE A CANDIDATE
  // app.delete is an HTTP request method
  //test that this works using insomnia core
  //IF YOU TRY TO RUN THE DELETE METHOD TWICE, IT WILL NOT WORK
app.delete('/api/candidate/:id', (req, res) => {
  const sql = `DELETE FROM candidates WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, result) => {
    if(err){
      res.statusMessage(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.join ({
        message: 'Candidate not found'
      });
    } else {
      res.json ({
        message: 'deleted',
        changes: result.affectedRows,
        id: req.params.id
      });
    }
  });
});










                        // CREATE A CANDIDATE
      // The PRIMARY KEY constraint protects the table from creating duplicate id's
// const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected) 
//               VALUES (?,?,?,?)`;
// const params = [1, 'Ronald', 'Firbank', 1];

// db.query(sql, params, (err, result) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(result);
// });


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