import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import MemberPage from "./pages/MemberPage";
import ProjectPage from "./pages/ProjectPage";
import InvitePage from "./pages/InvitePage";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    background: linear-gradient(135deg, #e3ecfc 0%, #f6f9ff 100%);
    min-height: 100vh;
    margin: 0;
    font-family: 'Pretendard', 'Noto Sans KR', 'Apple SD Gothic Neo', Arial, sans-serif;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 24px;
  justify-content: center;
  align-items: center;
  margin: 0 auto 38px auto;
  padding: 28px 0 0 0;
`;

const NavLink = styled(Link)`
  color: #1a237e;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.15rem;
  padding: 7px 24px;
  border-radius: 8px;
  transition: background 0.16s, color 0.16s;
  &:hover {
    background: #e3e8fd;
    color: #1565c0;
  }
`;

const App: React.FC = () => (
  <BrowserRouter>
    <GlobalStyle />
    <Nav>
      <NavLink to="/projects">프로젝트</NavLink>
      <NavLink to="/members">회원</NavLink>
      <NavLink to="/invites">초대</NavLink>
    </Nav>
    <Routes>
      <Route path="/projects" element={<ProjectPage />} />
      <Route path="/members" element={<MemberPage />} />
      <Route path="/invites" element={<InvitePage />} />
      <Route path="*" element={<ProjectPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
