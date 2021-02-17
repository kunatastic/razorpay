import React from "react";
require("dotenv").config();

export default function Tryenv() {
  return (
    <div>
      <h1>HELLO WORLD</h1>
      {console.log(process.env)}
    </div>
  );
}
