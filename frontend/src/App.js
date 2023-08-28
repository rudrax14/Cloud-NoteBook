import React, { useState } from 'react';
import Navbar from './components/Navbar'
import Home from './components/Home'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';




export default function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar showAlert={showAlert} />
          <Alert alert={alert} />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home showAlert={showAlert} />}></Route>
              <Route path="/about" element={<About />}></Route>
              <Route path="/login" element={<Login showAlert={showAlert} />}></Route>
              <Route path="/signup" element={<Signup showAlert={showAlert} />}></Route>
            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>

    </>
  )
}

