import React from "react";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Welcome from "./components/Welcome";

export default function App() {
  return (
    <BrowserRouter>
      <hr />
      <div>
        <Link to={"/"}>Home</Link>
        <br />
        <Link to={"/login"}>Login</Link>
        <br />
        <Link to={"/register"}>Register</Link>
        <br />
      </div>
      <hr />
      <Routes>
        <Route path="/register" element={<Register />} />
      </Routes>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
      <Routes>
        <Route path="/Welcome" element={<Welcome />} />
      </Routes>
      <hr />
    </BrowserRouter>
  );
}
