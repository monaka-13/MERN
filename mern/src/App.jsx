import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SimpleTodosList from "./components/simpleTodoList";
import CreateTask from "./components/createTask";
import EditTask from "./components/editTask";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <div className="container">
            <Route path="/" element={<SimpleTodosList />} />
            <Route path="/create" element={<CreateTask />} />
            <Route path="/update/:id" element={<EditTask />} />
          </div>
        </Routes>
      </BrowserRouter>
    </>
  );
}
