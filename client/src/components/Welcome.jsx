import React from "react";

const Welcome = (props) => {
  return (
    <div>
      <h1>Welcome, {props.name}!</h1>
      <p>Thank you for visiting our website.</p>
    </div>
  );
};

export default Welcome;
