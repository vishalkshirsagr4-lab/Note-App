const express = require('express');
const router = express.Router();

const { createNote,getNotes,getNoteById,updateNote, deleteNote } = require('../controllers/noteControl');

const authMiddleware = require('../middleware/authMiddleware');

router.post('/Addnote', authMiddleware, createNote);
router.get('/', authMiddleware, getNotes);

router.get('/getnote/:id', authMiddleware, getNoteById);
router.put('/update/:id', authMiddleware, updateNote);
router.delete('/delete/:id', authMiddleware, deleteNote);

module.exports = router;