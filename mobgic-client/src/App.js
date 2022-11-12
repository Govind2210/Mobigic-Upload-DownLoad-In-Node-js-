import React from 'react'
import Login from './components/Login'
import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import { APIContextProvider } from "./context/Context";
import Dashboard from './components/Dashboard';
import Signup from './components/Signup';

const App = () => {

  return (
    <>
      <BrowserRouter>
        <APIContextProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Signup" element={<Signup />} />
            <Route element={localStorage.getItem("email") ? (<Dashboard />) : (<Navigate replace to={"/Dashboard"} />)} path="/Dashboard"/>
          </Routes>
        </APIContextProvider>
      </BrowserRouter>
    </>
  )
}

export default App
