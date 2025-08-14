import React, { useState } from "react";
import axios from "axios";

export default function CreateTask({ onTaskCreated }) {
  const [activity, setActivity] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
  await axios.post("/api/tasks/add", { activity });
      setMessage("タスクを追加しました。");
      setActivity("");
      if (onTaskCreated) onTaskCreated();
    } catch (error) {
      setMessage("エラーが発生しました。"+error);
    }
  };

  return (
    <div>
      <h3>新しいタスクの追加</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
          placeholder="タスク内容"
          required
        />
        <button type="submit">追加</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
