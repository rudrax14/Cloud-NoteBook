// noteSlice.js
import { createSlice } from '@reduxjs/toolkit';

const noteSlice = createSlice({
    name: 'notes',
    initialState: [],
    reducers: {
        addNote: (state, action) => {

        },
        deleteNote: (state, action) => {

        },
        editNote: (state, action) => {

        },
        setNotes: (state, action) => {

        }
    }
});

export const { addNote, deleteNote, editNote, setNotes } = noteSlice.actions;
export default noteSlice.reducer;
