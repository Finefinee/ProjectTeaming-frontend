import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import styled, { keyframes } from "styled-components";
import { FiFolderPlus, FiFolder, FiTrash2, FiEdit3, FiUsers, FiUser, FiCalendar, FiCheck, FiClock, FiAlertCircle, FiFileText } from "react-icons/fi";


const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
`;

const Header = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 35px 40px;
  border-radius: 24px;
  margin-bottom: 30px;
  box-shadow: 0 12px 40px rgba(102, 126, 234, 0.25);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0.1) 100%);
    animation: ${shimmer} 4s infinite;
  }
  
  &::after {
    content: '📋';
    position: absolute;
    top: 20px;
    right: 30px;
    font-size: 3rem;
    opacity: 0.2;
    animation: ${float} 4s ease-in-out infinite;
  }
`;

const Title = styled.h1`
  color: #ffffff;
  font-size: 2.4rem;
  font-weight: 800;
  margin: 0 0 12px 0;
  display: flex;
  align-items: center;
  gap: 15px;
  position: relative;
  z-index: 1;
`;

const Subtitle = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.15rem;
  margin: 0;
  position: relative;
  z-index: 1;
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 35px;
`;

const StatCard = styled.div`
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  padding: 25px;
  border-radius: 18px;
  text-align: center;
  box-shadow: 0 6px 25px rgba(0,0,0,0.08);
  transition: all 0.3s ease;
  border: 1px solid rgba(255,255,255,0.8);
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 35px rgba(0,0,0,0.15);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }
  
  &:hover::before {
    transform: scaleX(1);
  }
`;

const StatIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 15px;
  color: white;
  font-size: 1.5rem;
`;

const StatNumber = styled.div`
  font-size: 2.2rem;
  font-weight: 900;
  color: #1e293b;
  margin-bottom: 8px;
`;

const StatLabel = styled.div`
  font-size: 0.95rem;
  color: #64748b;
  font-weight: 600;
`;

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 25px;
  margin-bottom: 40px;
`;

const ProjectCard = styled.div`
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  padding: 25px;
  border-radius: 20px;
  box-shadow: 0 6px 25px rgba(0,0,0,0.08);
  border: 1px solid rgba(255,255,255,0.8);
  position: relative;
  overflow: hidden;
  animation: ${fadeIn} 0.5s ease;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 35px rgba(0,0,0,0.15);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }
  
  &:hover::before {
    transform: scaleX(1);
  }
`;

const ProjectHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const ProjectTitle = styled.h3`
  color: #1e293b;
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
`;

const ProjectActions = styled.div`
  display: flex;
  gap: 8px;
  opacity: 0;
  transition: opacity 0.3s ease;
  
  ${ProjectCard}:hover & {
    opacity: 1;
  }
`;

const ActionButton = styled.button`
  background: transparent;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  
  &:hover {
    background: #f1f5f9;
    border-color: #cbd5e1;
    transform: scale(1.05);
  }
  
  &.danger:hover {
    background: #fee2e2;
    border-color: #fca5a5;
    color: #dc2626;
  }
`;

const ProjectContent = styled.div`
  color: #475569;
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 20px;
  max-height: 100px;
  overflow: hidden;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 20px;
    background: linear-gradient(transparent, #f8fafc);
  }
`;

const ProjectMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 20px;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  background: #f1f5f9;
  padding: 8px 12px;
  border-radius: 10px;
  font-size: 0.9rem;
  color: #475569;
  font-weight: 500;
`;

const StatusBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  margin-bottom: 15px;
`;

const FormContainer = styled.div`
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  padding: 35px;
  border-radius: 24px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.1);
  border: 1px solid rgba(255,255,255,0.8);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  }
`;

const FormTitle = styled.h2`
  color: #1e293b;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const InputGroup = styled.div`
  margin-bottom: 25px;
  position: relative;
`;

const InputLabel = styled.label`
  display: block;
  font-size: 0.95rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Input = styled.input`
  box-sizing: border-box;
  padding: 18px 24px;
  border-radius: 14px;
  border: 2px solid #e5e7eb;
  font-size: 1.05rem;
  width: 100%;
  background: #ffffff;
  outline: none;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  
  &:focus {
    border-color: #667eea;
    box-shadow: 0 4px 20px rgba(102, 126, 234, 0.2);
    transform: translateY(-2px);
  }
  
  &::placeholder {
    color: #9ca3af;
  }
  
  &:disabled {
    background: #f9fafb;
    color: #6b7280;
    cursor: not-allowed;
  }
`;

const TextArea = styled.textarea`
  box-sizing: border-box;
  padding: 18px 24px;
  border-radius: 14px;
  border: 2px solid #e5e7eb;
  font-size: 1.05rem;
  width: 100%;
  min-height: 120px;
  background: #ffffff;
  outline: none;
  resize: vertical;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  font-family: inherit;
  line-height: 1.6;
  
  &:focus {
    border-color: #667eea;
    box-shadow: 0 4px 20px rgba(102, 126, 234, 0.2);
    transform: translateY(-2px);
  }
  
  &::placeholder {
    color: #9ca3af;
  }
  
  &:disabled {
    background: #f9fafb;
    color: #6b7280;
    cursor: not-allowed;
  }
`;

const Button = styled.button`
  box-sizing: border-box;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  border: none;
  border-radius: 14px;
  padding: 20px 0;
  width: 100%;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 6px 25px rgba(102, 126, 234, 0.3);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #5a67d8 0%, #667eea 100%);
    transform: translateY(-3px);
    box-shadow: 0 10px 35px rgba(102, 126, 234, 0.4);
  }
  
  &:active {
    transform: translateY(-1px);
  }
  
  &:disabled {
    background: linear-gradient(135deg, #cbd5e1 0%, #94a3b8 100%);
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 80px 20px;
  color: #6853d1;
  
  .icon {
    font-size: 5rem;
    margin-bottom: 25px;
    opacity: 0.4;
    animation: ${float} 4s ease-in-out infinite;
  }
  
  .title {
    font-size: 1.4rem;
    font-weight: 700;
    margin-bottom: 12px;
    color: #1e293b;
  }
  
  .description {
    font-size: 1.05rem;
    opacity: 0.8;
    max-width: 400px;
    margin: 0 auto;
    line-height: 1.6;
    color: #7c4dff;
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

  const getRandomStatus = () => {
    const statuses = [
      { icon: <FiClock size={14} />, text: "진행 중", color: "#f59e0b" },
      { icon: <FiCheck size={14} />, text: "완료", color: "#10b981" },
      { icon: <FiAlertCircle size={14} />, text: "대기", color: "#ef4444" }
    ];
    return statuses[Math.floor(Math.random() * statuses.length)];
  };

  return (
      <Container>
        <Header>
          <Title>
            <FiFolder size={36} />
            프로젝트 관리
          </Title>
          <Subtitle>팀 프로젝트를 체계적으로 관리하고 추적하세요</Subtitle>
        </Header>

        <StatsContainer>
          <StatCard>
            <StatIcon>
              <FiFolder />
            </StatIcon>
            <StatNumber>{projects.length}</StatNumber>
            <StatLabel>전체 프로젝트</StatLabel>
          </StatCard>
          <StatCard>
            <StatIcon>
              <FiCheck />
            </StatIcon>
            <StatNumber>{Math.floor(projects.length * 0.6)}</StatNumber>
            <StatLabel>완료된 프로젝트</StatLabel>
          </StatCard>
          <StatCard>
            <StatIcon>
              <FiClock />
            </StatIcon>
            <StatNumber>{Math.ceil(projects.length * 0.4)}</StatNumber>
            <StatLabel>진행 중인 프로젝트</StatLabel>
          </StatCard>
        </StatsContainer>

        {projects.length === 0 ? (
            <Card>
              <EmptyState>
                <div className="icon">📋</div>
                <div className="title">아직 프로젝트가 없습니다</div>
                <div className="description">
                  새로운 프로젝트를 생성하여 팀의 업무를 체계적으로 관리해보세요.
                  프로젝트 관리가 더욱 쉬워집니다.
                </div>
              </EmptyState>
            </Card>
        ) : (
            <ProjectGrid>
              {projects.map((project) => {
                const status = getRandomStatus();
                return (
                    <ProjectCard key={project.id}>
                      <StatusBadge style={{ background: `linear-gradient(135deg, ${status.color} 0%, ${status.color}aa 100%)` }}>
                        {status.icon}
                        {status.text}
                      </StatusBadge>

                      <ProjectHeader>
                        <ProjectTitle>
                          <FiFolderPlus size={20} style={{ color: "#667eea" }} />
                          {project.title}
                        </ProjectTitle>
                        <ProjectActions>
                          <ActionButton title="편집">
                            <FiEdit3 size={16} />
                          </ActionButton>
                          <ActionButton
                              className="danger"
                              title="삭제"
                              onClick={() => handleDelete(project)}
                          >
                            <FiTrash2 size={16} />
                          </ActionButton>
                        </ProjectActions>
                      </ProjectHeader>

                      <ProjectContent>
                        {project.content}
                      </ProjectContent>

                      <ProjectMeta>
                        <MetaItem>
                          <FiFileText size={14} />
                          프로젝트 #{project.id}
                        </MetaItem>
                        {project.projectManager && (
                            <MetaItem>
                              <FiUser size={14} />
                              팀장: {project.projectManager}
                            </MetaItem>
                        )}
                        {project.projectMember && (
                            <MetaItem>
                              <FiUsers size={14} />
                              팀원: {project.projectMember}
                            </MetaItem>
                        )}
                        <MetaItem>
                          <FiCalendar size={14} />
                          생성일: {new Date().toLocaleDateString()}
                        </MetaItem>
                      </ProjectMeta>
                    </ProjectCard>
                );
              })}
            </ProjectGrid>
        )}

        <FormContainer>
          <FormTitle>
            <FiFolderPlus size={24} />
            새 프로젝트 생성
          </FormTitle>

          <InputGroup>
            <InputLabel>
              <FiFileText size={16} />
              프로젝트 제목
            </InputLabel>
            <Input
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="프로젝트 제목을 입력하세요"
                disabled={loading}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>
              <FiEdit3 size={16} />
              프로젝트 설명
            </InputLabel>
            <TextArea
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder="프로젝트에 대한 자세한 설명을 입력하세요..."
                disabled={loading}
            />
          </InputGroup>

          <Button
              onClick={handleCreate}
              disabled={loading || !title.trim() || !content.trim()}
          >
            {loading ? "생성 중..." : "프로젝트 생성"}
          </Button>
        </FormContainer>
      </Container>
  );
};

export default ProjectPage;