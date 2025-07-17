import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import styled from "styled-components";
import { FiFolderPlus, FiFolder, FiTrash2 } from "react-icons/fi";

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
`;

const Item = styled.li`
  display: flex;
  flex-direction: column;
  gap: 2px;
  background: #f7faff;
  padding: 13px 18px;
  margin-bottom: 12px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(30,80,210,0.06);
  font-size: 1.08rem;
  color: #23375c;
`;

const TopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ItemTitle = styled.span`
  display: flex;
  align-items: center;
  gap: 7px;
  font-weight: 600;
`;

const SubInfo = styled.div`
  font-size: 0.97rem;
  color: #687ea6;
  margin-top: 3px;
`;

const ActionBtn = styled.button`
  border: none;
  background: none;
  color: #a2a6b9;
  cursor: pointer;
  font-size: 1.08rem;
  transition: color 0.16s;
  &:hover { color: #304ffe; }
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
    border-color: #304ffe;
  }
`;

const TextArea = styled.textarea`
  padding: 13px 16px;
  border-radius: 9px;
  border: 1px solid #d0d7e5;
  font-size: 1.07rem;
  width: 100%;
  min-height: 70px;
  margin-bottom: 18px;
  background: #fafdff;
  outline: none;
  resize: vertical;
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
  id: number;
  title: string;
  content: string;
  projectManager?: string;
  projectMember?: string;
}

const ProjectPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchProjects = () => {
    fetch("http://localhost:8080/post")
      .then(res => res.json())
      .then(setProjects)
      .catch(() => setProjects([]));
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreate = async () => {
    if (!title.trim() || !content.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });
      if (!res.ok) throw new Error();
      setTitle("");
      setContent("");
      fetchProjects();
    } catch {
      alert("프로젝트 추가 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (project: Project) => {
    if (!window.confirm("정말 삭제할까요?")) return;
    try {
      await fetch("http://localhost:8080/post", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: project.id,
          title: project.title,
          content: project.content,
        }),
      });
      fetchProjects();
    } catch {
      alert("삭제 실패");
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
          <li style={{ color: "#b0b7c8", textAlign: "center", padding: "18px 0" }}>등록된 프로젝트가 없습니다.</li>
        ) : (
          projects.map((p) => (
            <Item key={p.id}>
              <TopRow>
                <ItemTitle>
                  <FiFolderPlus size={18} style={{ color: "#304ffe" }} />
                  {p.title}
                </ItemTitle>
                <ActionBtn onClick={() => handleDelete(p)} title="삭제">
                  <FiTrash2 />
                </ActionBtn>
              </TopRow>
              <SubInfo>
                {p.content && <div>내용: {p.content}</div>}
                {p.projectManager && <div>팀장: {p.projectManager}</div>}
                {p.projectMember && <div>팀원: {p.projectMember}</div>}
              </SubInfo>
            </Item>
          ))
        )}
      </List>
      <Input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="새 프로젝트 제목"
        disabled={loading}
      />
      <TextArea
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="내용 입력"
        disabled={loading}
      />
      <Button onClick={handleCreate} disabled={loading || !title.trim() || !content.trim()}>
        {loading ? "추가 중..." : "프로젝트 추가"}
      </Button>
    </Card>
  );
};

export default ProjectPage;