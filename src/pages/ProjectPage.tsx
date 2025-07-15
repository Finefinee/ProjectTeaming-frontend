import React, { useEffect, useState } from "react";

interface Project {
  id?: number;
  title?: string;
}

const ProjectPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/post")
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(() => setProjects([]));
  }, []);

  const handleCreate = () => {
    if (!title.trim()) return;
    fetch("http://localhost:8080/post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    }).then(() => window.location.reload());
  };

  return (
    <div
      style={{
        maxWidth: "900px",
        width: "100%",
        padding: "40px 80px",
        margin: "40px auto",
        borderRadius: "12px",
        boxShadow: "0 4px 16px rgba(0,0,0,0.07)",
        background: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h2 style={{ marginBottom: "32px", color: "#0d47a1" }}>프로젝트 목록</h2>
      <ul style={{ width: "100%", textAlign: "left", marginBottom: "24px", paddingLeft: "0" }}>
        {projects.length === 0 && <li style={{ padding: "10px 0", borderBottom: "1px solid #eee", listStyle: "none", fontSize: "17px", color: "#222" }}>등록된 프로젝트가 없습니다.</li>}
        {projects.map((p, i) => (
          <li key={p.id ?? i} style={{ padding: "10px 0", borderBottom: "1px solid #eee", listStyle: "none", fontSize: "17px" }}>{p.title || JSON.stringify(p)}</li>
        ))}
      </ul>
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="프로젝트 제목"
        style={{
          padding: "10px 16px",
          borderRadius: "6px",
          border: "1px solid #ddd",
          fontSize: "16px",
          width: "100%",
          marginBottom: "20px",
        }}
      />
      <button
        onClick={handleCreate}
        style={{
          background: "#1976d2",
          color: "white",
          border: "none",
          borderRadius: "6px",
          padding: "10px 30px",
          fontSize: "16px",
          cursor: "pointer",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          transition: "background 0.2s",
        }}
      >
        프로젝트 추가
      </button>
    </div>
  );
};

export default ProjectPage;