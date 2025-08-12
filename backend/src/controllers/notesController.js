import Note from "../models/Note.js";
import mongoose from "mongoose";

export async function getAllNotes(_, res) {
    try {
        const notes = await Note.find().sort({ createdAt: -1 }) //Newest First
        res.status(200).json(notes)
    }
    catch (error) {
        console.error("Error in getAllNotes controller", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export async function getNoteById(req, res) {
    try {
        const note = await Note.findById(req.params.id)
        if (!note) return res.status(404).json({ message: "Note not found" })
        res.json(note);
    } catch (error) {
        console.error("Error in getAllNotes controller", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export async function createNote(req, res) {
    try {
        const { title, content } = req.body;
        const newNote = new Note({
            title, content
        });
        const savedNote = await newNote.save();
        res.status(201).json(savedNote);
    } catch (error) {
        console.error("Error in createNote controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


export async function updateNote(req, res) {
    try {
        const { id } = req.params;
        const { title, content } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: "Note not found" });
        }

        const updatedNote = await Note.findByIdAndUpdate(
            id,
            { title, content },
            { new: true }
        );

        if (!updatedNote) {
            return res.status(404).json({ message: "Note not found" });
        }

        res.status(200).json(updatedNote);
    } catch (error) {
        console.error("Error in updateNote controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


export async function deleteNote(req, res) {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id)
        if (!deletedNote) return res.status(404).json({ message: "Note not found" })
        res.status(200).json({ message: "Note Deleted Successfully!" })
    }
    catch (error) {
        console.error("Error in updateNote controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}