// noteAtoms.js
import { atom, selectorFamily } from 'recoil';

export const notesState = atom({
    key: 'notesState',
    default: [],
});

// export const noteByIdSelector = selectorFamily({
//     key: 'noteByIdSelector',
//     get: (id) => ({ get }) => {
//         const notes = get(notesState);
//         return notes.find(note => note._id === id);
//     },
// });
