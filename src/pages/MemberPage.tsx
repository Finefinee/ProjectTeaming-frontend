import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import styled, { keyframes } from "styled-components";
import { FiUserPlus, FiUser, FiTrash2, FiEdit3, FiLock, FiMail, FiHash } from "react-icons/fi";

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

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Header = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 30px 35px;
  border-radius: 20px;
  margin-bottom: 30px;
  box-shadow: 0 10px 40px rgba(102, 126, 234, 0.3);
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
    animation: ${shimmer} 3s infinite;
  }
`;

const Title = styled.h1`
  color: #ffffff;
  font-size: 2.2rem;
  font-weight: 800;
  margin: 0 0 10px 0;
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;
  z-index: 1;
`;

const Subtitle = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.1rem;
  margin: 0;
  position: relative;
  z-index: 1;
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const StatCard = styled.div`
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  padding: 25px;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  transition: all 0.3s ease;
  border: 1px solid rgba(255,255,255,0.8);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0,0,0,0.12);
  }
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 900;
  color: #1976d2;
  margin-bottom: 8px;
`;

const StatLabel = styled.div`
  font-size: 0.95rem;
  color: #64748b;
  font-weight: 600;
`;

const List = styled.ul`
  width: 100%;
  margin: 0 0 30px 0;
  padding: 0;
  list-style: none;
`;

const Item = styled.li`
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  padding: 20px 25px;
  margin-bottom: 15px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(30,80,210,0.08);
  border: 1px solid rgba(25, 118, 210, 0.1);
  font-size: 1.1rem;
  color: #334155;
  position: relative;
  overflow: hidden;
  animation: ${fadeIn} 0.5s ease;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 30px rgba(30,80,210,0.15);
    border-color: rgba(25, 118, 210, 0.2);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: linear-gradient(135deg, #1976d2 0%, #42a5f5 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover::before {
    opacity: 1;
  }
`;

const TopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 700;
  font-size: 1.15rem;
`;

const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #1976d2 0%, #42a5f5 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 800;
  font-size: 1.2rem;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled.button`
  background: transparent;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  
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

const SubInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  font-size: 0.95rem;
  color: #64748b;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  background: #f1f5f9;
  padding: 6px 12px;
  border-radius: 8px;
  font-weight: 500;
`;

const FormContainer = styled.div`
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
  border: 1px solid rgba(255,255,255,0.8);
`;

const FormTitle = styled.h3`
  color: #1e293b;
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 25px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const InputGroup = styled.div`
  margin-bottom: 20px;
  position: relative;
`;

const InputLabel = styled.label`
  display: block;
  font-size: 0.9rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
`;

const Input = styled.input`
  box-sizing: border-box;
  padding: 16px 20px;
  padding-left: 50px;
  border-radius: 12px;
  border: 2px solid #e5e7eb;
  font-size: 1.05rem;
  width: 100%;
  background: #ffffff;
  outline: none;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  
  &:focus {
    border-color: #1976d2;
    box-shadow: 0 4px 20px rgba(25, 118, 210, 0.15);
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

const InputIcon = styled.div`
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
  color: #6b7280;
  pointer-events: none;
`;

const Button = styled.button`
  box-sizing: border-box;
  background: linear-gradient(135deg, #1976d2 0%, #42a5f5 100%);
  color: #fff;
  border: none;
  border-radius: 12px;
  padding: 18px 0;
  width: 100%;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(25, 118, 210, 0.3);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #0d47a1 0%, #1976d2 100%);
    transform: translateY(-3px);
    box-shadow: 0 8px 30px rgba(25, 118, 210, 0.4);
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
  
  &.loading {
    animation: ${pulse} 1.5s infinite;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #64748b;
  
  .icon {
    font-size: 4rem;
    margin-bottom: 20px;
    opacity: 0.5;
  }
  
  .title {
    font-size: 1.3rem;
    font-weight: 600;
    margin-bottom: 10px;
  }
  
  .description {
    font-size: 1rem;
    opacity: 0.8;
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

    const getInitials = (name: string) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    return (
        <Container>
            <Header>
                <Title>
                    <FiUser size={32} />
                    회원 관리 시스템
                </Title>
                <Subtitle>학급 회원들을 효율적으로 관리하세요</Subtitle>
            </Header>

            <StatsContainer>
                <StatCard>
                    <StatNumber>{members.length}</StatNumber>
                    <StatLabel>총 회원 수</StatLabel>
                </StatCard>
                <StatCard>
                    <StatNumber>{new Set(members.map(m => Math.floor(m.userId / 100))).size}</StatNumber>
                    <StatLabel>학급 수</StatLabel>
                </StatCard>
            </StatsContainer>

            <Card>
                <List>
                    {members.length === 0 ? (
                        <EmptyState>
                            <div className="icon">👥</div>
                            <div className="title">등록된 회원이 없습니다</div>
                            <div className="description">아래 양식을 통해 새로운 회원을 추가해보세요</div>
                        </EmptyState>
                    ) : (
                        members.map((m) => (
                            <Item key={m.id}>
                                <TopRow>
                                    <UserInfo>
                                        <UserAvatar>{getInitials(m.name)}</UserAvatar>
                                        <div>
                                            <div>{m.name}</div>
                                            <div style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 500 }}>
                                                @{m.username}
                                            </div>
                                        </div>
                                    </UserInfo>
                                    <ActionButtons>
                                        <ActionButton title="편집">
                                            <FiEdit3 size={16} />
                                        </ActionButton>
                                        <ActionButton className="danger" title="삭제">
                                            <FiTrash2 size={16} />
                                        </ActionButton>
                                    </ActionButtons>
                                </TopRow>
                                <SubInfo>
                                    <InfoItem>
                                        <FiHash size={14} />
                                        학번: {m.userId}
                                    </InfoItem>
                                    <InfoItem>
                                        <FiMail size={14} />
                                        ID: {m.username}
                                    </InfoItem>
                                </SubInfo>
                            </Item>
                        ))
                    )}
                </List>
            </Card>

            <FormContainer>
                <FormTitle>
                    <FiUserPlus size={24} />
                    새 회원 등록
                </FormTitle>

                <InputGroup>
                    <InputLabel>아이디</InputLabel>
                    <div style={{ position: 'relative' }}>
                        <InputIcon>
                            <FiUser size={18} />
                        </InputIcon>
                        <Input
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            placeholder="사용자 아이디를 입력하세요"
                            disabled={loading}
                        />
                    </div>
                </InputGroup>

                <InputGroup>
                    <InputLabel>이름</InputLabel>
                    <div style={{ position: 'relative' }}>
                        <InputIcon>
                            <FiUser size={18} />
                        </InputIcon>
                        <Input
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder="이름을 입력하세요"
                            disabled={loading}
                        />
                    </div>
                </InputGroup>

                <InputGroup>
                    <InputLabel>비밀번호</InputLabel>
                    <div style={{ position: 'relative' }}>
                        <InputIcon>
                            <FiLock size={18} />
                        </InputIcon>
                        <Input
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="비밀번호를 입력하세요"
                            type="password"
                            disabled={loading}
                        />
                    </div>
                </InputGroup>

                <InputGroup>
                    <InputLabel>학급 번호</InputLabel>
                    <div style={{ position: 'relative' }}>
                        <InputIcon>
                            <FiHash size={18} />
                        </InputIcon>
                        <Input
                            value={classCode}
                            onChange={e => setClassCode(e.target.value)}
                            placeholder="학급 번호를 입력하세요"
                            type="number"
                            disabled={loading}
                        />
                    </div>
                </InputGroup>

                <Button
                    onClick={handleCreate}
                    disabled={loading || !username.trim() || !name.trim() || !password.trim() || !classCode.trim()}
                    className={loading ? 'loading' : ''}
                >
                    {loading ? "등록 중..." : "회원 등록"}
                </Button>
            </FormContainer>
        </Container>
    );
};

export default MemberPage;