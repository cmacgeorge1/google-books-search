import React from "react";
import "./style.css";

// This file exports both the List and ListItem components

export function List({ children }) {
  return (
    <div className="list-overflow-container">
      <ul className="list-group">{children}</ul>
    </div>
  );
}

export function ListItem(props, { children }) {
  return (
    <div className="card">
      {props.title}
      {props.description}
      {props.authors}
      {props.link}
      {children}
    </div>
  ) 
}

// Add <a> tag to link