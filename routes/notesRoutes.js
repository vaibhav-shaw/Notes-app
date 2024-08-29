const express = require('express');
const {
    getAllNotes,
    createNote,
    updateNote,
    deleteNote
} = require('../controllers/notesController');

//router object
const router = express.Router();

//routes

//Get all notes list || GET
router.get('/getall', getAllNotes);

//Create a new note || POST
router.post('/create', createNote);

//Update a note || PUT
router.put('/update/:id', updateNote);

//Delete a note || DELETE
router.delete('/delete/:id', deleteNote);

module.exports = router;