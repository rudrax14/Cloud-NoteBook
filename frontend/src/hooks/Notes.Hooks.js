import axios from 'axios';
// recoil
import { useRecoilState } from 'recoil';
import { notesState } from '../store/atoms/noteAtoms';

const host = 'http://localhost:5000/api/v1';

const useNotes = () => {
    const setNotes = useRecoilState(notesState)[1];
    // const [notes, setNotes] = useRecoilState(notesState);

    const fetchNotes = async () => {
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

    const fetchAddNote = async (title, description, tag) => {
        try {
            const jwtToken = localStorage.getItem('token');
            const response = await axios.post(`${host}/createnote`, { title, description, tag }, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                }
            });
            console.log("hook-fetchAddNote", response.data);
            setNotes(prevNotes => [...prevNotes, response.data]);
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
            setNotes(prevNotes => prevNotes.filter(note => note._id !== id));
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

            setNotes(prevNotes =>
                prevNotes.map(note =>
                    note._id === id
                        ? { ...note, title, description, tag }
                        : note
                )
            );

        } catch (error) {
            console.log(error);
        }
    };

    return { fetchNotes, fetchAddNote, fetchDeleteNote, fetchEditNote };
};

export default useNotes;
