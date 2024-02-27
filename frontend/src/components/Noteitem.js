import React, { useContext } from 'react'
import useNotes from '../hooks/Notes.Hooks';




const Noteitem = (props) => {
    const { note, updateNote } = props;
    const { fetchDeleteNote } = useNotes()
    const nDelete = () => {
        // deleteNote(note._id)
        fetchDeleteNote(note._id)
        props.showAlert("Deleted successfully", "success")
    }

    return (
        <>

            <div className="col-md-3">
                <div className="card my-3" >

                    <div className="card-body my-3">
                        <h4 className="card-title">{note.title}</h4>
                        <h5 className="card-text">{note.description}</h5>
                        <p className="card-text">{note.tag}</p>
                        {/* delete Noteitem */}
                        <i className="fa-solid fa-trash-can me-3" onClick={nDelete}></i>
                        {/* Edit Noteitem */}
                        <i className="fa-solid fa-pen-to-square" onClick={() => { updateNote(note) }}></i>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Noteitem