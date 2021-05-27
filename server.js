// import express
const express = require('express');

// port designation and app expression
const PORT = process.env.PORT || 3001;
const app = express();

// Add Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// Default response for any other request (Not Found)
    //HANDLES USER REQUESTS THAT AREN'T SUPPORTED BY THE APP
app.use((req, res) => {
  res.status(404).end();
});


  // function to test that the connection is working
// app.get('/', (req, res) => {
//   res.json({
//     message: 'Hello World'
//   });
// });


// function to start express.js on port 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});