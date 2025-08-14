import React, { useState, useEffect } from "react";
import axios from "axios";
axios.defaults.baseURL = import.meta.env.VITE_API_URL;
import Navbar from "./navbar";

const Todo = (props) => {
  <tr className="d-flex">
    <td className="col-10">{props.todo}</td>
    <td className="col-2" style={{ textAlign: "right" }}>
      <button
        onClick={() => {
          props.editTodo(props.keyt);
        }}
      >
        Edit
      </button>
      <button
        onClick={() => {
          props.deleteTodo(props.keyt);
        }}
      >
        Delete
      </button>
    </td>
  </tr>;
};
export default function SimpleTodosList() {
  const editTodo = (id) => {};
  const deleteTodo = (id) => {};
  return (
    <>
      <Navbar />
      <h3>Logged Todos</h3>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Activity</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <Todo
              todo={todo.activity}
              keyt={todo._id}
              key={todo._id}
              editTodo={editTodo}
              deleteTodo={deleteTodo}
            />
          ))}
        </tbody>
      </table>
    </>
  );
}
