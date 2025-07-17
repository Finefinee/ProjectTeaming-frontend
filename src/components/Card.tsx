// src/components/Card.tsx
import styled from "styled-components";

const Card = styled.div`
    width: 420px;
    min-height: 480px;
    background: linear-gradient(145deg, #ffffff 0%, #f8fafc 100%);
    border-radius: 24px;
    box-shadow:
            0 20px 40px rgba(30, 60, 120, 0.12),
            0 8px 16px rgba(30, 60, 120, 0.06),
            inset 0 1px 0 rgba(255, 255, 255, 0.8);
    padding: 48px 32px 40px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    margin: 40px auto;
    position: relative;
    border: 1px solid rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(10px);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    /* 호버 효과 */
    &:hover {
        transform: translateY(-4px) scale(1.01);
        box-shadow:
                0 32px 64px rgba(30, 60, 120, 0.15),
                0 16px 32px rgba(30, 60, 120, 0.08),
                inset 0 1px 0 rgba(255, 255, 255, 0.9);
    }

    /* 반응형 디자인 */
    @media (max-width: 768px) {
        width: 90%;
        max-width: 380px;
        min-height: 440px;
        padding: 32px 24px 28px 24px;
        margin: 20px auto;
    }

    @media (max-width: 480px) {
        width: 95%;
        max-width: 340px;
        min-height: 400px;
        padding: 28px 20px 24px 20px;
        border-radius: 20px;
    }

    /* 로딩 상태 애니메이션 */
    &.loading {
        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: linear-gradient(90deg, #667eea, #764ba2);
            border-radius: 24px 24px 0 0;
            animation: loadingAnimation 2s ease-in-out infinite;
        }
    }

    @keyframes loadingAnimation {
        0% { transform: translateX(-100%); }
        50% { transform: translateX(0%); }
        100% { transform: translateX(100%); }
    }

    /* 데이터 상태별 스타일 */
    &.empty {
        background: linear-gradient(145deg, #f8fafc 0%, #e2e8f0 100%);
        border: 2px dashed #cbd5e0;

        &:hover {
            transform: translateY(-2px);
            border-color: #94a3b8;
        }
    }

    &.error {
        background: linear-gradient(145deg, #fff5f5 0%, #fed7d7 100%);
        border: 1px solid #feb2b2;

        &:hover {
            transform: translateY(-2px);
            box-shadow:
                    0 16px 32px rgba(254, 178, 178, 0.2),
                    0 8px 16px rgba(254, 178, 178, 0.1);
        }
    }

    /* 포커스 가능한 카드 */
    &.interactive {
        cursor: pointer;

        &:focus {
            outline: none;
            box-shadow:
                    0 20px 40px rgba(30, 60, 120, 0.12),
                    0 8px 16px rgba(30, 60, 120, 0.06),
                    0 0 0 3px rgba(102, 126, 234, 0.2);
        }
    }

    /* 다크 모드 지원 */
    @media (prefers-color-scheme: dark) {
        background: linear-gradient(145deg, #1a202c 0%, #2d3748 100%);
        border: 1px solid rgba(255, 255, 255, 0.1);
        color: #e2e8f0;

        &:hover {
            box-shadow:
                    0 32px 64px rgba(0, 0, 0, 0.3),
                    0 16px 32px rgba(0, 0, 0, 0.2),
                    inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }

        &.empty {
            background: linear-gradient(145deg, #2d3748 0%, #4a5568 100%);
            border-color: #4a5568;
        }

        &.error {
            background: linear-gradient(145deg, #742a2a 0%, #c53030 100%);
            border-color: #e53e3e;
        }
    }
`;

export default Card;