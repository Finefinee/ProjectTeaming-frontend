import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FiUserPlus, FiUser } from "react-icons/fi";

const Card = styled.div`
  max-width: 410px;
  margin: 40px auto;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 6px 36px rgba(30,60,120,0.10);
  padding: 44px 28px 36px 28px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  color: #1976d2;
  font-size: 1.65rem;
  font-weight: 700;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const List = styled.ul`
  width: 100%;
  margin: 0 0 28px 0;
  padding: 0;
  list-style: none;
  min-height: 32px;
`;

const Item = styled.li`
  display: flex;
  align-items: center;
  gap: 8px;
  background: #f8fafc;
  padding: 13px 18px;
  margin-bottom: 12px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(30,80,210,0.06);
  font-size: 1.10rem;
  color: #234;
`;

const Empty = styled.li`
  padding: 20px 0;
  text-align: center;
  color: #b0b7c8;
  font-size: 1.07rem;
  background: none;
  box-shadow: none;
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
    border-color: #1976d2;
  }
`;

const Button = styled.button`
  background: linear-gradient(90deg, #1976d2 0%, #42a5f5 100%);
  color: #fff;
  border: none;
  border-radius: 9px;
  padding: 13px 0;
  width: 100%;
  font-size: 1.13rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 2px 12px rgba(30,80,210,0.07);
  transition: background 0.14s, transform 0.1s;
  &:hover:not(:disabled) {
    background: linear-gradient(90deg, #0d47a1 0%, #1976d2 100%);
    transform: translateY(-2px) scale(1.01);
  }
  &:disabled {
    background: #b2c5e7;
    cursor: not-allowed;
    opacity: 0.65;
  }
`;

interface Member {
  id?: number;
  name?: string;
  username?: string;
}

const MemberPage: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [newName, setNewName] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchMembers = () => {
    fetch("http://localhost:8080/members")
      .then(res => res.json())
      .then(setMembers)
      .catch(() => setMembers([]));
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleCreate = async () => {
    if (!newName.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName }),
      });
      if (!res.ok) throw new Error();
      setNewName("");
      fetchMembers();
    } catch {
      alert("회원 추가 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <Title>
        <FiUser size={27} />
        회원 목록
      </Title>
      <List>
        {members.length === 0 ? (
          <Empty>회원이 없습니다.</Empty>
        ) : (
          members.map((m, i) => (
            <Item key={m.id ?? i}>
              <FiUserPlus size={18} style={{ color: "#1976d2" }} />
              {m.name || m.username || JSON.stringify(m)}
            </Item>
          ))
        )}
      </List>
      <Input
        value={newName}
        onChange={e => setNewName(e.target.value)}
        placeholder="새 회원 이름"
        disabled={loading}
        onKeyDown={e => { if (e.key === "Enter") handleCreate(); }}
      />
      <Button onClick={handleCreate} disabled={loading || !newName.trim()}>
        {loading ? "추가 중..." : "회원 추가"}
      </Button>
    </Card>
  );
};

export default MemberPage;
