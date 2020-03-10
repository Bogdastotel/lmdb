import React from "react";
// import Container from "react-bootstrap/container";
import Background from "../assets/cinema3.png";

export const Layout = props => (
  <div
    style={{
      /* backgroundImage: "linear-gradient(to right, #141e30, #243b55)", */
      backgroundImage: `url(${Background})`,
      minHeight: "100vh",
      fontFamily: "Josefin Sans"
    }}
  >
    {props.children}
  </div>
);
