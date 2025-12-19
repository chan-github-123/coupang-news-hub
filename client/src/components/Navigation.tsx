import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="navigation">
      <button
        className="nav-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="메뉴 열기"
      >
        <span className="hamburger"></span>
      </button>

      <ul className={`nav-menu ${isOpen ? 'open' : ''}`}>
        <li>
          <Link
            to="/"
            className={isActive('/') ? 'active' : ''}
            onClick={() => setIsOpen(false)}
          >
            홈
          </Link>
        </li>
        <li>
          <Link
            to="/about"
            className={isActive('/about') ? 'active' : ''}
            onClick={() => setIsOpen(false)}
          >
            소개
          </Link>
        </li>
        <li>
          <Link
            to="/contact"
            className={isActive('/contact') ? 'active' : ''}
            onClick={() => setIsOpen(false)}
          >
            문의하기
          </Link>
        </li>
      </ul>
    </nav>
  );
}
