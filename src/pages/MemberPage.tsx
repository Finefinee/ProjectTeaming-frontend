import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import styled from "styled-components";
import { FiUserPlus, FiUser } from "react-icons/fi";

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
`;

const Item = styled.li`
  display: flex;
  flex-direction: column;
  gap: 3px;
  background: #f8fafc;
  padding: 13px 18px;
  margin-bottom: 12px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(30,80,210,0.06);
  font-size: 1.10rem;
  color: #234;
`;

const TopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const UserInfo = styled.span`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
`;

const SubInfo = styled.div`
  font-size: 0.96rem;
  color: #6c86a3;
`;

const Input = styled.input`
  padding: 13px 16px;
  border-radius: 9px;
  border: 1px solid #d0d7e5;
  font-size: 1.07rem;
  width: 100%;
  margin-bottom: 12px;
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
  id: number;
  username: string;
  name: string;
  password: string;
  userId: number;
}

const MemberPage: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [classCode, setClassCode] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchMembers = () => {
    fetch("http://localhost:8080/auth")
      .then(res => res.json())
      .then(setMembers)
      .catch(() => setMembers([]));
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleCreate = async () => {
    if (!username.trim() || !name.trim() || !password.trim() || !classCode.trim()) return;
    setLoading(true);
    try {
      await fetch("http://localhost:8080/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          name,
          password,
          class_code: parseInt(classCode, 10),
        }),
      });
      setUsername("");
      setName("");
      setPassword("");
      setClassCode("");
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
          <li style={{ color: "#b0b7c8", textAlign: "center", padding: "18px 0" }}>
            회원이 없습니다.
          </li>
        ) : (
          members.map((m) => (
            <Item key={m.id}>
              <TopRow>
                <UserInfo>
                  <FiUserPlus size={18} style={{ color: "#1976d2" }} />
                  {m.name} ({m.username})
                </UserInfo>
                {/* 삭제 버튼 등 필요 시 추가 */}
              </TopRow>
              <SubInfo>학번: {m.userId}</SubInfo>
            </Item>
          ))
        )}
      </List>
      <Input
        value={username}
        onChange={e => setUsername(e.target.value)}
        placeholder="아이디"
        disabled={loading}
      />
      <Input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="이름"
        disabled={loading}
      />
      <Input
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="비밀번호"
        type="password"
        disabled={loading}
      />
      <Input
        value={classCode}
        onChange={e => setClassCode(e.target.value)}
        placeholder="반 (숫자)"
        type="number"
        disabled={loading}
      />
      <Button onClick={handleCreate} disabled={loading || !username.trim() || !name.trim() || !password.trim() || !classCode.trim()}>
        {loading ? "추가 중..." : "회원 추가"}
      </Button>
    </Card>
  );
};

export default MemberPage;