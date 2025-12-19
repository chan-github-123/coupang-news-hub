import { Link } from 'react-router-dom';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>쿠팡 뉴스 허브</h3>
          <p>쿠팡 관련 뉴스와 유튜브 영상을 한곳에서 모아보는 정보 큐레이션 서비스입니다.</p>
        </div>

        <div className="footer-section">
          <h4>바로가기</h4>
          <nav className="footer-nav">
            <Link to="/">홈</Link>
            <Link to="/about">소개</Link>
            <Link to="/contact">문의하기</Link>
          </nav>
        </div>

        <div className="footer-section">
          <h4>법적 고지</h4>
          <nav className="footer-nav">
            <Link to="/privacy">개인정보처리방침</Link>
          </nav>
        </div>

        <div className="footer-section">
          <h4>문의</h4>
          <p>이메일: contact@coupangnews.example.com</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} 쿠팡 뉴스 허브. All rights reserved.</p>
        <p className="disclaimer">
          본 사이트는 쿠팡 주식회사와 직접적인 관련이 없는 독립적인 정보 서비스입니다.
        </p>
      </div>
    </footer>
  );
}
