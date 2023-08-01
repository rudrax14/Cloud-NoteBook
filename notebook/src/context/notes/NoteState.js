import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
    const host = 'http://localhost:5000'
    const notesIntial = []
    const [notes, setNotes] = useState(notesIntial)
    const getNotes = async () => {
        //Api req
        const response = await fetch(`${host}/api/note/fetchallnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')

            },

        });
        const json = await response.json()
        // console.log(json)
        setNotes(json)
    }


    // Add note
    const addNote = async (title, description, tag) => {
        //Api req
        const response = await fetch(`${host}/api/note/addnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')

            },
            body: JSON.stringify({ title, description, tag }),
        });
        const note = await response.json()
        setNotes(notes.concat(note))

        // Logic

    }
    //Delete Note
    const deleteNote = async (id) => {
        //Api req
        const response = await fetch(`${host}/api/note/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')

            },
        });
        const json = response.json()
        setNotes(json)
        //Logic
        const newNote = notes.filter((note) => { return note._id !== id })
        setNotes(newNote)
    }
    //Edit note
    const editNote = async (id, title, description, tag) => {
        //Api req
        const response = await fetch(`${host}/api/note/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag }),
        });
        const json = response.json()
        console.log(json)
        let newNotes = JSON.parse(JSON.stringify(notes))
        //Logic
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes)
    }


    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;