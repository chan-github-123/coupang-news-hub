import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface HeaderProps {
  onSearch?: (keyword: string) => void;
  loading?: boolean;
}

export function Header({ onSearch, loading }: HeaderProps) {
  const [keyword, setKeyword] = useState('쿠팡');
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === '/';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyword.trim()) {
      if (!isHome) {
        navigate('/');
      }
      onSearch?.(keyword.trim());
    }
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          <span className="logo-icon">C</span>
          쿠팡 뉴스 허브
        </Link>

        <nav className="nav-desktop">
          <Link to="/" className={isActive('/') ? 'active' : ''}>홈</Link>
          <Link to="/about" className={isActive('/about') ? 'active' : ''}>소개</Link>
          <Link to="/contact" className={isActive('/contact') ? 'active' : ''}>문의하기</Link>
        </nav>

        <form className="search-form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="검색어를 입력하세요"
            className="search-input"
            aria-label="검색어"
          />
          <button type="submit" className="search-button" disabled={loading}>
            {loading ? '검색 중...' : '검색'}
          </button>
        </form>

        <button
          className={`nav-toggle ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="메뉴 열기"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <nav className={`nav-mobile ${menuOpen ? 'open' : ''}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>홈</Link>
        <Link to="/about" onClick={() => setMenuOpen(false)}>소개</Link>
        <Link to="/contact" onClick={() => setMenuOpen(false)}>문의하기</Link>
        <Link to="/privacy" onClick={() => setMenuOpen(false)}>개인정보처리방침</Link>
      </nav>
    </header>
  );
}
