import React from 'react'

import Notes from './Notes';
import AddNote from './AddNote';
function Home(props) {
    const { showAlert } = props
    return (
        <>

            <AddNote showAlert={showAlert} />
            <Notes showAlert={showAlert} />
        </>
    )
}

export default Home