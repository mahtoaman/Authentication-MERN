import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const token = localStorage.getItem("token");
  const [data, setData] = useState({});
  const navigate = useNavigate()

  const handleLogOut = ()=>{
    localStorage.removeItem('token')
    navigate('/')

  }

  useEffect(() => {
    axios
      .get("/user", {
        headers: {
          authorization: `${token}`,
        },
      })
      .then(function (response) {
        setData(response.data.data);
      })
      .catch((error) => console.log(error.message));
  }, [token]);

  return (
    <>
      <div className="dashboard-container">
        <h1>Welcome {data.name}</h1>
        <p>Email: {data.email}</p>
        <button onClick={handleLogOut}>Log Out</button>
      </div>
    </>
  );
}
