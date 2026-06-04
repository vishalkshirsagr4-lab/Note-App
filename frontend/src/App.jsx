import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Addnote from './pages/Addnote';
import Editnote from './pages/Editnote';
import './App.css'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path="/Dashboard" element={<Dashboard />} />
             <Route path="/add-note" element={<Addnote />}/>
            <Route path="/edit-note/:id" element={<Editnote />} />
            <Route path='/' element= { <Login/> }/>
            <Route path='/register' element= { <Register/> }/>
            <Route path='/' element={ <Dashboard/> }/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
