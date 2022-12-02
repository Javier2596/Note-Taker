const express = require('express');
const path = require('path');
const { custom } = require('./middleware/custom');
const api = require('./routes/index.js')

const PORT = process.env.PORT || 3001;

const app = express();

// imported custom middleware
app.use(custom);

// Middleware for parsing JSON urlencoded form data 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

// helps give access to all files in public folder  
app.use(express.static('public'));

//route to the index.html page
app.get('/', (req, res) => 
  res.sendFile(path.join(__dirname, '/public/index.html'))
);
// route to the note.html page
app.get('/notes', (req, res) => 
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.listen(PORT, () => 
console.log(`App listening at http://localhost:${PORT}`));