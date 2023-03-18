import React from "react";

import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <div>
        <h1>This is Home</h1>
      </div>
      <div>
        <Link to={"/"}>Home |</Link>
        <Link to={"/login"}>Login| </Link>
        <Link to={"/register"}>Register |</Link>
      </div>
    </>
  );
}
