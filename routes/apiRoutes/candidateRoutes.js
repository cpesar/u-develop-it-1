const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');






      // GET ROUTE- RETURNS ALL CANDIDATES
        // /api/candidates = endpoint
        //No longer need to include /api
        //change 'app' to 'router'
router.get('/candidates', (req, res) => {
    //route to join adding the party name
  const sql = `SELECT candidates.*, parties.name
               AS party_name
               FROM candidates
               LEFT JOIN parties
               ON candidates.party_id = parties.id`;
      
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
      //No longer need to include /api
        //change 'app' to 'router'
router.get('/candidate/:id', (req, res) => {
        //route to join adding the party name
const sql = `SELECT candidates.*, parties.name
             AS party_name
             FROM candidates
             LEFT JOIN parties
             ON candidates.party_id = parties.id
             WHERE candidates.id = ?`;
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



                     // CREATE A CANDIDATE
//app.post is an HTTP request method to insert a candidate into the candidates table
// the object req.body populates the candidates data
router.post('/candidate', ({ body }, res) => {
  //object destructuring to pull the body property out of the request object
  //inputCheck verifies that the user info in the request can create a candidate
const errors = inputCheck(body, 'first_name', 'last_name', 'industry_connected');
if (errors) {
//if the inputCheck() returns an error, it will return a 400 status code
//prompts the user for a different request with a JSON object that contains the reason for the errors
res.status(400).json ({ error: errors });
return;
}
const sql = `INSERT INTO candidates (first_name, last_name, industry_connected)
VALUES (?, ?, ?)`;
const params = [body.first_name, body.last_name, body.industry_connected];

db.query(sql, params, (err, result) => {
if(err){
  res.status(400).json({ error: err.message });
  return;
}
res.json ({
  message: 'success',
  data: body
})
})
});



          //PUT REQUEST TO UPDATE A CANDIDATES PARTY
// Update a candidate's party
router.put('/candidate/:id', (req, res) => {
  const errors = inputCheck(req.body, 'party_id');

  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }

  const sql = `UPDATE candidates SET party_id = ? 
               WHERE id = ?`;
  const params = [req.body.party_id, req.params.id];
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      // check if a record was found
    } else if (!result.affectedRows) {
      res.json({
        message: 'Candidate not found'
      });
    } else {
      res.json({
        message: 'success',
        data: req.body,
        changes: result.affectedRows
      });
    }
  });
});



           // DELETE A CANDIDATE
  // app.delete is an HTTP request method
  //test that this works using insomnia core
  //IF YOU TRY TO RUN THE DELETE METHOD TWICE, IT WILL NOT WORK
  router.delete('/candidate/:id', (req, res) => {
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


//EXPORT THE ROUTER OBJECT
  module.exports = router;