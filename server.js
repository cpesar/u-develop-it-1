// import express
const express = require('express');

//import connection.js module
const db = require('./db/connection');

const apiRoutes = require('./routes/apiRoutes');


// port designation and app expression
const PORT = process.env.PORT || 3001;
const app = express();

// Add Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//use api routes
app.use('/api', apiRoutes);

  // Default response for any other request (Not Found)
  //HANDLES USER REQUESTS THAT AREN'T SUPPORTED BY THE APP
app.use((req, res) => {
res.status(404).end();
});


//start server after DB connection
db.connect(err => {
  if(err) throw err;
  console.log('Database connected');
  // function to start express.js on port 3001
  app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  });
});









 
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


 


            // FUNCTION TO TEST THAT THE APP IS WORKING
// app.get('/', (req, res) => {
//   res.json({
//     message: 'Hello World'
//   });
// });




