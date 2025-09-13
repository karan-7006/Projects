import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./True-Certify/Home"
import Login from "./True-Certify/Login.jsx"
import Registration from "./True-Certify/Registration.jsx"
import UserEdit from "./True-Certify/UserEdit.jsx"

function App() {
  return (
    <BrowserRouter>
    <div>

      <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/registration" element={<Registration/>} />
      <Route path="/useredit" element={<UserEdit />} />
      </Routes>

    </div>
    </BrowserRouter>
  )
}

export default App
