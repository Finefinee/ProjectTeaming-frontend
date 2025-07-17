import React, { useState } from "react";
import Card from "../components/Card";
import styled from "styled-components";
import { FiSend, FiUser, FiFolder, FiMail, FiCheck, FiAlertCircle } from "react-icons/fi";

const Title = styled.h2`
    color: #7c4dff;
    font-size: 1.8rem;
    font-weight: 700;
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    text-align: center;
    background: linear-gradient(135deg, #7c4dff 0%, #536dfe 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
`;

const InputContainer = styled.div`
    position: relative;
    width: 100%;
    margin-bottom: 20px;
`;

const InputLabel = styled.label`
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: #7c4dff;
    font-size: 1.1rem;
    pointer-events: none;
    z-index: 1;
`;

const Input = styled.input`
    box-sizing: border-box;
    padding: 16px 20px 16px 48px;
    border-radius: 12px;
    border: 2px solid #e2e8f0;
    font-size: 1.1rem;
    width: 100%;
    background: linear-gradient(135deg, #fafdff 0%, #f0f9ff 100%);
    outline: none;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 2px 8px rgba(124, 77, 255, 0.05);

    &:focus {
        border-color: #7c4dff;
        background: #ffffff;
        box-shadow:
                0 0 0 3px rgba(124, 77, 255, 0.1),
                0 4px 16px rgba(124, 77, 255, 0.15);
        transform: translateY(-1px);
    }

    &::placeholder {
        color: #94a3b8;
        opacity: 0.7;
    }

    &:disabled {
        background: #f1f5f9;
        border-color: #cbd5e0;
        cursor: not-allowed;
        opacity: 0.6;
    }

    &:not(:placeholder-shown) {
        padding-left: 48px;
    }
`;

const Button = styled.button`
  box-sizing: border-box;
  background: linear-gradient(135deg, #7c4dff 0%, #536dfe 100%);
  color: #ffffff;
  border: none;
  border-radius: 12px;
  padding: 18px 0;
  width: 100%;
  font-size: 1.15rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 
    0 4px 16px rgba(124, 77, 255, 0.2),
    0 2px 8px rgba(124, 77, 255, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s;
  }
  
  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #536dfe 0%, #7c4dff 100%);
    transform: translateY(-2px) scale(1.02);
    box-shadow: 
      0 8px 24px rgba(124, 77, 255, 0.3),
      0 4px 16px rgba(124, 77, 255, 0.2);
    
    &::before {
      left: 100%;
    }
  }
  
  &:active:not(:disabled) {
    transform: translateY(0) scale(1);
  }
  
  &:disabled {
    background: linear-gradient(135deg, #cbd5e0 0%, #94a3b8 100%);
    cursor: not-allowed;
    opacity: 0.6;
    transform: none;
    box-shadow: 0 2px 8px rgba(203, 213, 224, 0.2);
  }
`;

const Desc = styled.div`
  color: #64748b;
  font-size: 1.05rem;
  margin-bottom: 32px;
  text-align: center;
  line-height: 1.6;
  padding: 20px;
  background: linear-gradient(135deg, rgba(124, 77, 255, 0.05) 0%, rgba(83, 109, 254, 0.05) 100%);
  border-radius: 12px;
  border: 1px solid rgba(124, 77, 255, 0.1);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, #7c4dff, #536dfe);
    border-radius: 12px 12px 0 0;
  }
`;

const LoadingSpinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid #ffffff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ToastContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
`;

interface ToastProps {
  $type: 'success' | 'error';
}

const Toast = styled.div<ToastProps>`
  background: ${props => props.$type === 'success'
    ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
    : 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'};
  color: white;
  padding: 16px 20px;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  animation: slideIn 0.3s ease-out;
  
  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
`;

const FormSection = styled.div`
  width: 100%;
  margin-bottom: 24px;
`;

const InvitePage: React.FC = () => {
    const [memberUsername, setMemberUsername] = useState("");
    const [projectId, setProjectId] = useState("");
    const [loading, setLoading] = useState(false);
    const [toasts, setToasts] = useState<Array<{id: number, message: string, type: 'success' | 'error'}>>([]);

    const showToast = (message: string, type: 'success' | 'error') => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts(prev => prev.filter(toast => toast.id !== id));
        }, 3000);
    };

    const handleInvite = async () => {
        if (!memberUsername.trim() || !projectId.trim()) {
            showToast("프로젝트 ID와 초대할 회원 아이디를 모두 입력하세요.", "error");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("http://localhost:8080/invites", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    projectMemberUsername: memberUsername,
                    projectId: Number(projectId)
                }),
                credentials: "include"
            });

            if (!res.ok) throw new Error();

            showToast("초대가 성공적으로 전송되었습니다!", "success");
            setMemberUsername("");
            setProjectId("");
        } catch {
            showToast("초대 중 오류가 발생했습니다. 다시 시도해주세요.", "error");
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !loading && memberUsername.trim() && projectId.trim()) {
            handleInvite();
        }
    };

    return (
        <>
            <Card className={loading ? "loading" : ""}>
                <Title>
                    <FiMail size={28} />
                    팀원 초대
                </Title>

                <Desc>
                    프로젝트에 참여할 팀원을 초대하세요.
                    <br />
                    아래 정보를 입력하면 해당 회원에게 초대 알림이 전송됩니다.
                </Desc>

                <FormSection>
                    <InputContainer>
                        <InputLabel>
                            <FiFolder size={18} />
                        </InputLabel>
                        <Input
                            value={projectId}
                            onChange={e => setProjectId(e.target.value)}
                            placeholder="프로젝트 ID를 입력하세요"
                            disabled={loading}
                            type="number"
                            onKeyDown={handleKeyDown}
                        />
                    </InputContainer>

                    <InputContainer>
                        <InputLabel>
                            <FiUser size={18} />
                        </InputLabel>
                        <Input
                            value={memberUsername}
                            onChange={e => setMemberUsername(e.target.value)}
                            placeholder="초대할 회원의 아이디를 입력하세요"
                            disabled={loading}
                            onKeyDown={handleKeyDown}
                        />
                    </InputContainer>
                </FormSection>

                <Button
                    onClick={handleInvite}
                    disabled={loading || !memberUsername.trim() || !projectId.trim()}
                >
                    {loading ? (
                        <>
                            <LoadingSpinner />
                            초대 전송 중...
                        </>
                    ) : (
                        <>
                            <FiSend size={20} />
                            초대 보내기
                        </>
                    )}
                </Button>
            </Card>

            <ToastContainer>
                {toasts.map(toast => (
                    <Toast key={toast.id} $type={toast.type}>
                        {toast.type === 'success' ? <FiCheck size={18} /> : <FiAlertCircle size={18} />}
                        {toast.message}
                    </Toast>
                ))}
            </ToastContainer>
        </>
    );
};

export default InvitePage;