

import React, { useState } from "react";

const InvitePage: React.FC = () => {
  const [memberUsername, setMemberUsername] = useState("");

  // 초대 보내기
  const handleInvite = () => {
    if (!memberUsername.trim()) return;
    fetch("http://localhost:8080/invite", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ projectMemberUsername: memberUsername }),
      credentials: "include"
    }).then(() => {
      alert("초대 완료!");
      setMemberUsername("");
    });
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
        alignItems: "center"
      }}
    >
      <h2
        style={{
          marginBottom: "32px",
          color: "#0d47a1"
        }}
      >
        초대 보내기
      </h2>
      <input
        value={memberUsername}
        onChange={e => setMemberUsername(e.target.value)}
        placeholder="초대할 회원 아이디"
        style={{
          padding: "10px 16px",
          borderRadius: "6px",
          border: "1px solid #ddd",
          fontSize: "16px",
          width: "100%",
          marginBottom: "20px"
        }}
      />
      <button
        onClick={handleInvite}
        style={{
          background: "#1976d2",
          color: "white",
          border: "none",
          borderRadius: "6px",
          padding: "10px 30px",
          fontSize: "16px",
          cursor: "pointer",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          transition: "background 0.2s"
        }}
      >
        초대
      </button>
    </div>
  );
};

export default InvitePage;