const Note = require('../models/notes');

const createNote = async (req, res) => {
    try {
        const { title, content } = req.body;

        const note = await Note.create({
            title,
            content,
            user: req.user.id
        });

        res.status(201).json({
            message: "Note created successfully",
            note
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

const getNotes = async (req, res) => {
    try {
        const notes = await Note.find({
            user: req.user.id
        });

        res.status(200).json(notes);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

const getNoteById = async (req, res) => {
    try {
        const note = await Note.findOne({
            _id: req.params.id,
            user: req.user.id
        });

        if (!note) {
            return res.status(404).json({
                message: "Note not found"
            });
        }

        res.status(200).json(note);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

const updateNote = async (req, res) => {
    try {
        const note = await Note.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.user.id
            },
            req.body,
            { new: true }
        );

        if (!note) {
            return res.status(404).json({
                message: "Note not found"
            });
        }

        res.status(200).json({
            message: "Note updated",
            note
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

const deleteNote = async (req, res) => {
    try {
        const note = await Note.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id
        });

        if (!note) {
            return res.status(404).json({
                message: "Note not found"
            });
        }

        res.status(200).json({
            message: "Note deleted successfully"
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

module.exports = { createNote , getNotes , getNoteById , updateNote ,deleteNote };