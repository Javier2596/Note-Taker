const notes = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

// GET Route for retrieving all notes
notes.get('/', (req, res) => {
    console.info(`${req.method} request received for notes`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for new note 
notes.post('/', (req, res) => {
  console.info(req.body);
  const { noteTitle, noteText } = req.body;

  if(req.body) {
  const newNote = {
    noteTitle,
    noteText, 
    id: uuid(),
  };
  readAndAppend(newNote, 'db/db.json');
  res.json(`Note added successfully!`);
  } else {
    res.error('Error in adding note');
  }
});

module.exports = notes; 
