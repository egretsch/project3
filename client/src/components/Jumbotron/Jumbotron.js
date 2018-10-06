import React from "react";
import './Jumbotron.css'

const Jumbotron = props =>
  <div className={`jumbotron${props.fluid ? "-fluid" : ""}`} {...props} />;

export default Jumbotron;
