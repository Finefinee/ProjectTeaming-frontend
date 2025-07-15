import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import MemberPage from './pages/MemberPage'
import ProjectPage from './pages/ProjectPage'
import InvitePage from './pages/InvitePage'

function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#222",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        justifyContent: "center",
        width: "100vw"
      }}
    >
      <BrowserRouter>
        <nav
          style={{
            display: 'flex',
            gap: '24px',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '36px 0',
            padding: '18px 0',
            background: '#f5f7fb',
            borderRadius: '14px',
            boxShadow: '0 2px 16px rgba(0,0,0,0.08)',
          }}
        >
          <Link
            to="/members"
            style={{
              fontSize: '18px',
              color: '#0d47a1',
              textDecoration: 'none',
              fontWeight: 600,
              padding: '6px 18px',
              borderRadius: '8px',
              transition: 'background 0.2s',
            }}
          >
            회원
          </Link>
          <Link
            to="/projects"
            style={{
              fontSize: '18px',
              color: '#1976d2',
              textDecoration: 'none',
              fontWeight: 600,
              padding: '6px 18px',
              borderRadius: '8px',
              transition: 'background 0.2s',
            }}
          >
            프로젝트
          </Link>
          <Link
            to="/invite"
            style={{
              fontSize: '18px',
              color: '#42a5f5',
              textDecoration: 'none',
              fontWeight: 600,
              padding: '6px 18px',
              borderRadius: '8px',
              transition: 'background 0.2s',
            }}
          >
            초대
          </Link>
        </nav>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "calc(100vh - 140px)",
            width: "100vw"
          }}
        >
          <Routes>
            <Route path="/members" element={<MemberPage />} />
            <Route path="/projects" element={<ProjectPage />} />
            <Route path="/invite" element={<InvitePage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App