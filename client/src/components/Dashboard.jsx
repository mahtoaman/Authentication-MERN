import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get("/user")
      .then((response) => setData(response.data))
      .catch((error) => setMessage(error.message));
  }, []);

  return (
    <div>
      {message != "" ? (
        <h3>{message}</h3>
      ) : (
        <ul>
          {data.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
