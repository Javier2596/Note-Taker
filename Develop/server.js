const express = require('express');
const path = require('path');
const note = require('./routes/notes');
const noteData = require('./db/db.json');
const fs = require('fs');
const uuid = require('./helpers/uuid');

const PORT = process.env.PORT || 3001;

const app = express();

// Middleware for parsing JSON urlencoded form data 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('//api', api);
// helps give access to all files in public folder  
app.use(express.static('public'));
//route to the homepage
app.get('/', (req, res) => 
  res.sendFile(path.join(__dirname, '/public/index.html'))
);
// route to the note.html page
app.get('/', (req, res) => 
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET api route for the db.json file 
app.get('/api/notes', (req, res) => {
  res.json(noteData);
});

// POST api route 
app.post('/api/notes', (req, res) => { 
  
  console.info(`${req.method} request received to add a review`);

  const { noteTitle, noteText } = req.body;

  if(noteTitle && noteText) {
  const newNote = {
    title,
    text, 
    id: uuid(),
  };

  const noteString = JSON.stringify(newNote);

  // Writes the string to a file
  fs.writeFile(`./db/${newNote.noteTitle}.json`, noteString, (err) =>
    err
      ? console.error(err)
      : console.log(
          `Review for ${newNote.noteTitle} has been written to JSON file`
        )
  );

  const response = {
    status: 'success',
    body: newNote,
  };

  console.log(response);
  res.status(201).json(response);
} else {
  res.status(500).json('Error in posting review');
}
});   

app.listen(PORT, () => 
console.log(`App lsitening at http://localhost:${PORT}`));