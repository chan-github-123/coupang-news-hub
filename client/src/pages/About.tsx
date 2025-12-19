import { Link } from 'react-router-dom';

export function About() {
  return (
    <div className="page-container">
      <article className="page-content">
        <h1>소개</h1>

        <section className="content-section">
          <h2>쿠팡 뉴스 허브란?</h2>
          <p>
            쿠팡 뉴스 허브는 대한민국 대표 이커머스 기업인 쿠팡(Coupang)에 관한
            최신 뉴스와 유튜브 영상을 한곳에서 모아볼 수 있는 정보 큐레이션 서비스입니다.
          </p>
          <p>
            바쁜 현대인들을 위해 여러 뉴스 사이트와 유튜브를 일일이 검색할 필요 없이,
            쿠팡 관련 소식을 빠르고 편리하게 확인할 수 있도록 도와드립니다.
          </p>
        </section>

        <section className="content-section">
          <h2>주요 기능</h2>
          <ul className="feature-list">
            <li>
              <strong>실시간 뉴스 수집</strong>
              <p>Google News, 네이버 뉴스 등 다양한 소스에서 쿠팡 관련 최신 뉴스를 자동으로 수집합니다.</p>
            </li>
            <li>
              <strong>유튜브 영상 검색</strong>
              <p>쿠팡 관련 유튜브 영상을 검색하여 투자 분석, 기업 소식, 리뷰 등 다양한 콘텐츠를 제공합니다.</p>
            </li>
            <li>
              <strong>AI 요약 기능</strong>
              <p>수집된 뉴스의 핵심 내용을 AI가 요약하여 빠르게 트렌드를 파악할 수 있습니다.</p>
            </li>
            <li>
              <strong>키워드 검색</strong>
              <p>쿠팡 외에도 관심 있는 키워드로 검색하여 관련 뉴스와 영상을 찾아볼 수 있습니다.</p>
            </li>
          </ul>
        </section>

        <section className="content-section">
          <h2>서비스 이용 안내</h2>
          <p>
            본 서비스는 무료로 제공되며, 별도의 회원가입 없이 누구나 이용할 수 있습니다.
            검색창에 원하는 키워드를 입력하면 관련 뉴스와 영상을 바로 확인할 수 있습니다.
          </p>
          <p>
            PWA(Progressive Web App)를 지원하여 모바일 기기에서 앱처럼 설치하여
            사용할 수 있으며, 오프라인에서도 이전에 본 콘텐츠를 확인할 수 있습니다.
          </p>
        </section>

        <section className="content-section">
          <h2>면책 조항</h2>
          <p>
            쿠팡 뉴스 허브는 쿠팡 주식회사와 직접적인 관련이 없는 독립적인 정보 서비스입니다.
            본 사이트에서 제공하는 뉴스와 영상은 각 원본 출처의 저작권을 따르며,
            투자 조언이나 권유를 목적으로 하지 않습니다.
          </p>
        </section>

        <div className="page-links">
          <Link to="/" className="btn-primary">홈으로 돌아가기</Link>
          <Link to="/contact" className="btn-secondary">문의하기</Link>
        </div>
      </article>
    </div>
  );
}
