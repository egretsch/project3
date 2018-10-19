import React from "react";

export const ListItem = props => (
  <li style={props.style} className="flex-column list-group-item">
    {props.children}
  </li>
);
