import React from "react";
// import Container from "react-bootstrap/container";

export const Layout = props => (
  <div style={{ backgroundColor: "#1D1D1D", minHeight: "100vh" }}>
    {props.children}
  </div>
);
