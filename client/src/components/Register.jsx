import React, { useState } from "react";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:4000";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async (e) => {
    e.preventDefault();

    const data = { email, password };
    axios.post("/register", data).then();
  };

  return (
    <form action="" onSubmit={registerUser}>
      <input
        type="email"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button type="submit">Register</button>
    </form>
  );
}
