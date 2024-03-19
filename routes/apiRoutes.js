const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

function readNotes() {
  const notesData = fs.readFileSync(path.join(__dirname, '..', 'db.json'), 'utf8');
  return JSON.parse(notesData) || [];
}

function writeNotes(notes) {
  fs.writeFileSync(path.join(__dirname, '..', 'db.json'), JSON.stringify(notes), 'utf8');
}

function generateId() {
  return Date.now().toString();
}

router.get('/notes', (req, res) => {
  const notes = readNotes();
  res.json(notes);
});

router.post('/notes', (req, res) => {
  const notes = readNotes();
  const newNote = {
    id: generateId(),
    title: req.body.title,
    text: req.body.text
  };
  notes.push(newNote);
  writeNotes(notes);
  res.json(newNote);
});

router.delete('/notes/:id', (req, res) => {
  const notes = readNotes();
  const noteId = req.params.id;
  const updatedNotes = notes.filter(note => note.id !== noteId);
  writeNotes(updatedNotes);
  res.json({ message: 'Note deleted successfully' });
});

module.exports = router;

