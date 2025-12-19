import { Link } from 'react-router-dom';

export function Privacy() {
  return (
    <div className="page-container">
      <article className="page-content">
        <h1>개인정보처리방침</h1>
        <p className="last-updated">최종 수정일: 2024년 1월 1일</p>

        <section className="content-section">
          <h2>1. 개인정보의 처리 목적</h2>
          <p>
            쿠팡 뉴스 허브(이하 "서비스")는 다음의 목적을 위하여 개인정보를 처리합니다.
            처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며,
            이용 목적이 변경되는 경우에는 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
          </p>
          <ul>
            <li>문의사항 접수 및 처리</li>
            <li>서비스 이용 통계 분석</li>
            <li>서비스 개선 및 신규 기능 개발</li>
          </ul>
        </section>

        <section className="content-section">
          <h2>2. 수집하는 개인정보 항목</h2>
          <p>서비스는 최소한의 개인정보만을 수집합니다.</p>
          <ul>
            <li><strong>문의하기 이용 시:</strong> 이름, 이메일 주소</li>
            <li><strong>자동 수집 정보:</strong> 접속 IP, 브라우저 종류, 접속 시간 (서비스 분석용)</li>
          </ul>
        </section>

        <section className="content-section">
          <h2>3. 개인정보의 보유 및 이용 기간</h2>
          <p>
            서비스는 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다.
          </p>
          <ul>
            <li>문의 내용: 문의 처리 완료 후 1년</li>
            <li>접속 기록: 3개월</li>
          </ul>
        </section>

        <section className="content-section">
          <h2>4. 개인정보의 제3자 제공</h2>
          <p>
            서비스는 원칙적으로 이용자의 개인정보를 외부에 제공하지 않습니다.
            다만, 아래의 경우에는 예외로 합니다.
          </p>
          <ul>
            <li>이용자가 사전에 동의한 경우</li>
            <li>법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 요청이 있는 경우</li>
          </ul>
        </section>

        <section className="content-section">
          <h2>5. 쿠키(Cookie)의 사용</h2>
          <p>
            서비스는 이용자에게 개별적인 맞춤 서비스를 제공하기 위해 쿠키를 사용합니다.
            쿠키는 웹사이트가 이용자의 컴퓨터 브라우저로 전송하는 소량의 정보입니다.
          </p>
          <p>
            이용자는 쿠키 설치에 대한 선택권을 가지고 있으며, 웹 브라우저 설정을 통해
            쿠키 허용, 차단 등의 설정을 할 수 있습니다.
          </p>
        </section>

        <section className="content-section">
          <h2>6. 개인정보 보호책임자</h2>
          <p>
            서비스는 개인정보 처리에 관한 업무를 총괄해서 책임지고,
            개인정보 처리와 관련한 이용자의 불만처리 및 피해구제 등을 위하여
            아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
          </p>
          <div className="contact-info">
            <p><strong>개인정보 보호책임자</strong></p>
            <p>이메일: privacy@coupangnews.example.com</p>
          </div>
        </section>

        <section className="content-section">
          <h2>7. 개인정보처리방침의 변경</h2>
          <p>
            이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의
            추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터
            공지사항을 통하여 고지할 것입니다.
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
