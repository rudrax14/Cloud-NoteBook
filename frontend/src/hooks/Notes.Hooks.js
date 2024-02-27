import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
// import { setNotes } from './yourSliceFile'; // Import your slice actions here

const host = 'http://localhost:5000/api/v1';

const useNotes = () => {
    const [notes, setNotesState] = useState([]);
    const dispatch = useDispatch();

    const getNotes = async () => {
        try {
            const jwtToken = localStorage.getItem('token');
            const response = await axios.get(`${host}/fetchnotes`, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                }
            });
            setNotesState(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const addNote = async (title, description, tag) => {
        try {
            const jwtToken = localStorage.getItem('token');
            const response = await axios.post(`${host}/createnote`, { title, description, tag }, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                }
            });
            setNotesState([...notes, response.data]);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteNote = async (id) => {
        try {
            const jwtToken = localStorage.getItem('token');
            await axios.delete(`${host}/deleteNote/${id}`, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                }
            });
            setNotesState(notes.filter(note => note._id !== id));
        } catch (error) {
            console.log(error);
        }
    };

    const editNote = async (id, title, description, tag) => {
        try {
            const jwtToken = localStorage.getItem('token');
            await axios.put(`${host}/updateNote/${id}`, { title, description, tag }, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                }
            });
            setNotesState(notes.map(note => (note._id === id ? { ...note, title, description, tag } : note)));
        } catch (error) {
            console.log(error);
        }
    };

    return { notes, getNotes, addNote, deleteNote, editNote, setNotesState };
};

export default useNotes;
