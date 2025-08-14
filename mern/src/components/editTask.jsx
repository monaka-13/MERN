import React, { useState, useEffect } from "react";
import axios from "axios";

export default function EditTask({ taskId, onTaskUpdated }) {
  const [activity, setActivity] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (taskId) {
      axios.get(`/tasks/${taskId}`)
        .then(res => setActivity(res.data.activity))
        .catch(() => setMessage("タスク取得エラー"));
    }
  }, [taskId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/tasks/update/${taskId}`, { activity });
      setMessage("タスクを更新しました。");
      if (onTaskUpdated) onTaskUpdated();
    } catch (err) {
      setMessage("更新エラー");
    }
  };

  return (
    <div>
      <h3>タスクの編集</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
          required
        />
        <button type="submit">更新</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
