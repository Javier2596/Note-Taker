const express = require('express');
const fs = require('fs');
const api = require('./routes/notes.js');

const PORT = process.env.PORT || 3001;

const app = express();

// Middleware for parsing JSON urlencoded form data 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('//api', api);

app.use(express.static('public'));

//get route homepage
app.get('/', (req, res) => 
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET route for notes page 
app.get('/', (req, res) => 
  res.sendFile(path.join(__dirname, '/public/notes.html')) 
);

app.listen(PORT, () => 
console.log(`App lsitening at http://localhost:${PORT}`));