import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getNotes, addNote, deleteNote, editNote } from '../redux/slices/noteSlice';

const host = 'http://localhost:5000/api/v1';

const useNotes = () => {
    const dispatch = useDispatch();

    const fetchNotes = async () => {
        try {
            const jwtToken = localStorage.getItem('token');
            const response = await axios.get(`${host}/fetchnotes`, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                }
            });


            dispatch(getNotes(response.data));

        } catch (error) {
            console.log(error);
        }
    };

    const fetchAddNote = async (title, description, tag) => {
        try {
            const jwtToken = localStorage.getItem('token');
            const response = await axios.post(`${host}/createnote`, { title, description, tag }, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                }
            });
            console.log("hook-fetchAddNote", response.data);
            dispatch(addNote(response.data));
        } catch (error) {
            console.log(error);
        }
    };

    const fetchDeleteNote = async (id) => {
        try {
            const jwtToken = localStorage.getItem('token');
            await axios.delete(`${host}/deleteNote/${id}`, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                }
            });
            dispatch(deleteNote(id));
        } catch (error) {
            console.log(error);
        }
    };

    const fetchEditNote = async (id, title, description, tag) => {
        try {
            const jwtToken = localStorage.getItem('token');
            await axios.put(`${host}/updateNote/${id}`, { title, description, tag }, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                }
            });

            dispatch(editNote({ id, title, description, tag }));

        } catch (error) {
            console.log(error);
        }
    };

    return { fetchNotes, fetchAddNote, fetchDeleteNote, fetchEditNote };
};

export default useNotes;
