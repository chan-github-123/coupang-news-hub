import { useState } from 'react';
import { Link } from 'react-router-dom';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 실제로는 서버로 전송하거나 이메일 서비스 연동
    console.log('문의 내용:', formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="page-container">
        <div className="page-content">
          <div className="success-message">
            <h2>문의가 접수되었습니다</h2>
            <p>빠른 시일 내에 답변 드리겠습니다. 감사합니다.</p>
            <Link to="/" className="btn-primary">홈으로 돌아가기</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <article className="page-content">
        <h1>문의하기</h1>

        <section className="content-section">
          <p>
            쿠팡 뉴스 허브에 대한 문의사항, 제안, 오류 신고 등을 보내주세요.
            가능한 빠른 시일 내에 답변 드리겠습니다.
          </p>
        </section>

        <section className="content-section">
          <h2>연락처 정보</h2>
          <div className="contact-info">
            <div className="contact-item">
              <strong>이메일</strong>
              <p>contact@coupangnews.example.com</p>
            </div>
            <div className="contact-item">
              <strong>운영 시간</strong>
              <p>평일 09:00 - 18:00 (주말 및 공휴일 제외)</p>
            </div>
          </div>
        </section>

        <section className="content-section">
          <h2>문의 양식</h2>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">이름 *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="홍길동"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">이메일 *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="example@email.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">문의 유형 *</label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              >
                <option value="">선택해주세요</option>
                <option value="general">일반 문의</option>
                <option value="bug">오류 신고</option>
                <option value="suggestion">기능 제안</option>
                <option value="partnership">제휴 문의</option>
                <option value="other">기타</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="message">문의 내용 *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                placeholder="문의하실 내용을 자세히 적어주세요."
              />
            </div>

            <button type="submit" className="btn-primary">문의 보내기</button>
          </form>
        </section>

        <div className="page-links">
          <Link to="/" className="btn-secondary">홈으로 돌아가기</Link>
          <Link to="/about" className="btn-secondary">서비스 소개</Link>
        </div>
      </article>
    </div>
  );
}
