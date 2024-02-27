import NoteContext from "./noteContext";
import { useState } from "react";
import axios from "axios";

const NoteState = (props) => {
    const host = 'http://localhost:5000/api/v1';
    const [notes, setNotes] = useState([]);

    // Get all notes
    const getNotes = async () => {
        try {
            const jwtToken = localStorage.getItem('token');
            const response = await axios.get(`${host}/fetchnotes`, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                }
            });
            setNotes(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    // Add note
    const addNote = async (title, description, tag) => {
        try {
            const jwtToken = localStorage.getItem('token');
            const response = await axios.post(`${host}/createnote`, { title, description, tag }, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                }
            });
            setNotes([...notes, response.data]);
        } catch (error) {
            console.log(error);
        }
    };

    // Delete note
    const deleteNote = async (id) => {
        try {
            const jwtToken = localStorage.getItem('token');
            await axios.delete(`${host}/deleteNote/${id}`, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                }
            });
            setNotes(notes.filter(note => note._id !== id));
        } catch (error) {
            console.log(error);
        }
    };

    // Edit note
    const editNote = async (id, title, description, tag) => {
        try {
            const jwtToken = localStorage.getItem('token');
            await axios.put(`${host}/updateNote/${id}`, { title, description, tag }, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                }
            });
            setNotes(notes.map(note => (note._id === id ? { ...note, title, description, tag } : note)));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    );
};

export default NoteState;
