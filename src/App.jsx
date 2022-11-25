import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { FirebaseProvider } from './context/FirebaseContext'
import { UserProvider } from './context/UserContext'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {

  return (
    <UserProvider>
      <FirebaseProvider>
        <BrowserRouter>
          <Routes>
            <Route index path="/" element={<Login />} />
            <Route index path="/register" element={<Register />} />
            <Route index path="/home" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </FirebaseProvider>
    </UserProvider>
  )
}

export default App
