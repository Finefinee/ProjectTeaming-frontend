import React, { useState } from "react";
import Card from "../components/Card";
import styled from "styled-components";
import { FiSend } from "react-icons/fi";

const Title = styled.h2`
  color: #7c4dff;
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Input = styled.input`
  padding: 14px 17px;
  border-radius: 9px;
  border: 1px solid #d0d7e5;
  font-size: 1.07rem;
  width: 100%;
  margin-bottom: 18px;
  background: #fafdff;
  outline: none;
  transition: border-color 0.18s;
  &:focus {
    border-color: #7c4dff;
  }
`;

const Button = styled.button`
  background: linear-gradient(90deg, #7c4dff 0%, #536dfe 100%);
  color: #fff;
  border: none;
  border-radius: 9px;
  padding: 13px 0;
  width: 100%;
  font-size: 1.13rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 2px 12px rgba(100,60,255,0.08);
  transition: background 0.14s, transform 0.1s;
  &:hover:not(:disabled) {
    background: linear-gradient(90deg, #536dfe 0%, #7c4dff 100%);
    transform: translateY(-2px) scale(1.01);
  }
  &:disabled {
    background: #c9bbf7;
    cursor: not-allowed;
    opacity: 0.65;
  }
`;

const Desc = styled.div`
  color: #7c4dff;
  font-size: 1rem;
  margin-bottom: 18px;
  text-align: center;
  opacity: 0.8;
`;

const InvitePage: React.FC = () => {
  const [memberUsername, setMemberUsername] = useState("");
  const [projectId, setProjectId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInvite = async () => {
    if (!memberUsername.trim() || !projectId.trim()) {
      alert("프로젝트 ID와 초대할 회원 아이디를 모두 입력하세요.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/invites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectMemberUsername: memberUsername, projectId: Number(projectId) }),
        credentials: "include"
      });
      if (!res.ok) throw new Error();
      alert("초대 완료!");
      setMemberUsername("");
      setProjectId("");
    } catch {
      alert("초대 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <Title>
        <FiSend size={25} />
        초대 보내기
      </Title>
      <Desc>
        팀에 초대할 회원 아이디와 프로젝트 ID를 입력하세요.
      </Desc>
      <Input
        value={projectId}
        onChange={e => setProjectId(e.target.value)}
        placeholder="프로젝트 ID"
        disabled={loading}
        style={{ marginBottom: 10 }}
        type="number"
      />
      <Input
        value={memberUsername}
        onChange={e => setMemberUsername(e.target.value)}
        placeholder="초대할 회원 아이디"
        disabled={loading}
        onKeyDown={e => { if (e.key === "Enter") handleInvite(); }}
      />
      <Button
        onClick={handleInvite}
        disabled={loading || !memberUsername.trim() || !projectId.trim()}>
        {loading ? "초대 중..." : "초대"}
      </Button>
    </Card>
  );
};

export default InvitePage;
