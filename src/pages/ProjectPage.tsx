import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FiFolderPlus, FiFolder } from "react-icons/fi";

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
  color: #304ffe;
  font-size: 1.7rem;
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
  background: #f7faff;
  padding: 13px 18px;
  margin-bottom: 12px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(30,80,210,0.06);
  font-size: 1.10rem;
  color: #23375c;
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
    border-color: #304ffe;
  }
`;

const Button = styled.button`
  background: linear-gradient(90deg, #304ffe 0%, #1976d2 100%);
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
    background: linear-gradient(90deg, #1976d2 0%, #304ffe 100%);
    transform: translateY(-2px) scale(1.01);
  }
  &:disabled {
    background: #b9c8f7;
    cursor: not-allowed;
    opacity: 0.65;
  }
`;

interface Project {
  id?: number;
  title?: string;
}

const ProjectPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchProjects = () => {
    fetch("http://localhost:8080/projects")
      .then(res => res.json())
      .then(setProjects)
      .catch(() => setProjects([]));
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreate = async () => {
    if (!title.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });
      if (!res.ok) throw new Error();
      setTitle("");
      fetchProjects();
    } catch {
      alert("프로젝트 추가 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <Title>
        <FiFolder size={28} />
        프로젝트 목록
      </Title>
      <List>
        {projects.length === 0 ? (
          <Empty>등록된 프로젝트가 없습니다.</Empty>
        ) : (
          projects.map((p, i) => (
            <Item key={p.id ?? i}>
              <FiFolderPlus size={19} style={{ color: "#304ffe" }} />
              {p.title || JSON.stringify(p)}
            </Item>
          ))
        )}
      </List>
      <Input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="새 프로젝트 제목"
        disabled={loading}
        onKeyDown={e => { if (e.key === "Enter") handleCreate(); }}
      />
      <Button onClick={handleCreate} disabled={loading || !title.trim()}>
        {loading ? "추가 중..." : "프로젝트 추가"}
      </Button>
    </Card>
  );
};

export default ProjectPage;
