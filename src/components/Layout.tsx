import { } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Layout.css';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Hide footer on pet chat page
  const isPetPage = location.pathname.startsWith('/pet/');

  return (
    <div className="layout">
      <header className="header">
        <div className="header-content">
          {/* Logo */}
          <Link to="/" className="logo">
            Pets Project
          </Link>

          {/* Navigation Tabs */}
          <nav className="nav-tabs">
            <Link 
              to="/" 
              className={`nav-tab ${isActive('/') ? 'active' : ''}`}
            >
              <img src="/icons/gallery-icon.png" alt="" className="nav-icon" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
              Gallery
            </Link>
            <Link 
              to="/create" 
              className={`nav-tab ${isActive('/create') ? 'active' : ''}`}
            >
              <img src="/icons/create-icon.png" alt="" className="nav-icon" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
              Create
            </Link>
            <Link 
              to="/how-it-works" 
              className={`nav-tab ${isActive('/how-it-works') ? 'active' : ''}`}
            >
              <img src="/icons/how-it-works-icon.png" alt="" className="nav-icon" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
              How It Works
            </Link>
          </nav>

          {/* Right side */}
          <div className="header-right">
            <div className="live-badge">
              LIVE
            </div>
            <a 
              href="https://x.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="x-button"
            >
              X
            </a>
          </div>
        </div>
      </header>
      
      <main className="main">
        {children}
      </main>
      
      {!isPetPage && (
        <footer className="footer">
          <div className="container">
            <div className="footer-content">
              <span className="footer-logo">Pets Project</span>
              <span className="footer-divider">—</span>
              <span className="footer-text">RWA for Your Beloved Companions</span>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
