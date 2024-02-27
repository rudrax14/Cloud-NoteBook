const Note = require('../models/Note');

exports.fetchAllUserNotes = async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id }).select('-user');
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
};
exports.fetchAllNotes = async (req, res) => {
    try {
        const notes = await Note.find({})
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
};



exports.createNote = async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const newNote = new Note({
            user: req.user.id,
            title,
            description,
            tag
        });
        const note = await newNote.save();
        res.json(note);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
};


exports.updateNote = async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const noteFields = {};
        if (title) noteFields.title = title;
        if (description) noteFields.description = description;
        if (tag) noteFields.tag = tag;

        let note = await Note.findById(req.params.id);

        if (!note) return res.status(404).json({ msg: "Note not found" });

        // Ensure user owns note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "Not authorized" });
        }

        note = await Note.findByIdAndUpdate(
            req.params.id,
            { $set: noteFields },
            { new: true }
        );

        res.json(note);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
};


exports.deleteNote = async (req, res) => {
    try {
        let note = await Note.findById(req.params.id);

        if (!note) return res.status(404).json({ msg: "Note not found" });

        // Ensure user owns note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "Not authorized" });
        }

        await Note.findByIdAndRemove(req.params.id);

        res.json({ msg: "Note removed" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
};
