import React from "react";

export const ListItem = props => (
  <li className="flex-column list-group-item">
    {props.children}
  </li>
);
