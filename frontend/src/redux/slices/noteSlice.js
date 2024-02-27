// noteSlice.js
import { createSlice } from '@reduxjs/toolkit';

const noteSlice = createSlice({
    name: 'notes',
    initialState: [],
    reducers: {
        getNotes: (state, action) => {
            // console.log('Action Payload:', action.payload);
            return action.payload;
        },
        addNote: (state, action) => {
            console.log('Action Payload:', action.payload);
            return [...state, action.payload];
        },
        deleteNote: (state, action) => {
            console.log('Action Payload:', action.payload);
            return state.filter(note => note._id !== action.payload);
        },
        editNote: (state, action) => {
            console.log('Action Payload:', action.payload);
            return state.map(note => (note._id === action.payload.id ? { ...note, title: action.payload.title, description: action.payload.description, tag: action.payload.tag } : note));

        },
    }
});

export const { getNotes, addNote, deleteNote, editNote } = noteSlice.actions;
export default noteSlice.reducer;
