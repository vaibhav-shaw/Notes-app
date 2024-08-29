const db = require('../config/db');
const moment = require('moment');

//GET all notes from the database
const getAllNotes = async (req, res) => {
    try {
        const data = await db.query('SELECT * FROM notes')
        if (!data) {
            return res.status(404).send({
                success: false,
                message: "No notes found"
            })
        }
        /* //testing
        res.status(200).send({
            success: true,
            message: "Notes retrieved successfully",
            totalNotes: data[0].length,
            data: data[0],
        })
        */
        res.status(200).json({
            data: data[0],
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in fetching notes",
            error
        })
    }
}

//Create a new note in the database
const createNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        if (!title || !content) {
            return res.status(500).send({
                success: false,
                message: "Title and content are required"
            })
        }
        const mysqlTimestamp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
        // console.log(mysqlTimestamp);
        const data = await db.query('INSERT INTO notes (title, content, created_at, updated_at) VALUES (?,?,?,?)', [title, content, mysqlTimestamp, mysqlTimestamp]);
        if (!data) {
            return res.status(404).send({
                success: false,
                message: "Error in creating a new note"
            })
        }
        const newNote = await db.query('SELECT * FROM notes WHERE id=(SELECT max(id) FROM notes);');
        res.status(201).json({
            newNote: newNote[0][0],
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in creating a new note",
            error
        })
    }
}

const updateNote = async (req, res) => {
    try {
        const noteId = req.params.id;
        if (!noteId) {
            return res.status(404).send({
                success: false,
                message: "Note ID is required"
            })
        }

        const { title, content } = req.body;
        const mysqlTimestamp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
        const data = await db.query('UPDATE notes SET title=?, content=?, updated_at=? WHERE id=?', [title, content, mysqlTimestamp, noteId]);
        if (!data) {
            return res.status(500).send({
                success: false,
                message: "Error in updating a note"
            })
        }

        const updatedNote = await db.query('SELECT * FROM notes WHERE id=?', [noteId]);
        res.status(200).json({
            updatedNote: updatedNote[0][0],
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in updating a note",
            error
        })
    }
};

//Delete a note from the database
const deleteNote = async (req, res) => {
    try {
        const noteId = req.params.id;
        if (!noteId) {
            return res.status(404).send({
                success: false,
                message: "Note ID is required"
            })
        }
        const data = await db.query('DELETE FROM notes WHERE id=?', [noteId]);
        if (!data) {
            return res.status(500).send({
                success: false,
                message: "Error in deleting a note"
            })
        }
        res.status(200).json({
            success: true,
            message: "Note deleted successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in deleting a note",
            error
        })
    }
}

module.exports = {
    getAllNotes,
    createNote,
    updateNote,
    deleteNote
};