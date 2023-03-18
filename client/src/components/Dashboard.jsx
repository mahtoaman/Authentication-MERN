import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Dashboard() {
  // const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get("/user", {
        headers: {
          authorization: `${token}`,
        },
      })
      .then(function (response) {
        setData(response.data);
        console.log(response.data.data.email)
      })
      .catch((error) => setMessage(error.message));
  }, []);

  return <div>Welcome {data.data.email}</div>;
}
