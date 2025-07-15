import React, { useEffect, useState } from "react";

interface Member {
  id?: number;
  name?: string;
  username?: string;
}

const MemberPage: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [newName, setNewName] = useState("");

  // 회원 목록 불러오기
  useEffect(() => {
    fetch("http://localhost:8080/post")
      .then(res => res.json())
      .then(data => setMembers(data))
      .catch(() => setMembers([]));
  }, []);

  // 회원 추가
  const handleCreate = () => {
    if (!newName.trim()) return;
    fetch("http://localhost:8080/post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName }),
    }).then(() => window.location.reload());
  };

  return (
    <div
      style={{
        maxWidth: "900px",
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
      <h2 style={{ marginBottom: "32px", color: "#0d47a1" }}>회원 목록</h2>
      <ul>
        {members.length === 0 && <li>회원이 없습니다.</li>}
        {members.map((m, i) => (
          <li key={m.id ?? i}>{m.name || m.username || JSON.stringify(m)}</li>
        ))}
      </ul>
      <input
        value={newName}
        onChange={e => setNewName(e.target.value)}
        placeholder="회원 이름"
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
        회원 추가
      </button>
    </div>
  );
};

export default MemberPage;
