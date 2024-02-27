const express = require("express");
const router = express.Router();

const { auth } = require("../middleware/Auth.middleware");
const {
    fetchAllUserNotes,
    fetchAllNotes,
    createNote,
    updateNote,
    deleteNote,
} = require("../controllers/Notes.controller");

// Fetch all notes
router.route("/fetchnotes").get(auth, fetchAllUserNotes);
router.route("/fetchAllnotes").get(auth, fetchAllNotes);

// Create a new note
router.route("/createnote").post(auth, createNote);

// Update a note
router.route("/updatenote/:id").put(auth, updateNote);

// Delete a note
router.route("/deletenote/:id").delete(auth, deleteNote);

module.exports = router;
