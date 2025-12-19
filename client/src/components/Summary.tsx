interface SummaryProps {
  summary: string;
  newsCount: number;
  videoCount: number;
}

export function Summary({ summary, newsCount, videoCount }: SummaryProps) {
  return (
    <section className="summary-section">
      <h2>오늘의 요약</h2>
      <div className="summary-card">
        <p className="summary-text">{summary}</p>
        <div className="summary-stats">
          <span className="stat">
            <strong>{newsCount}</strong> 뉴스
          </span>
          <span className="stat">
            <strong>{videoCount}</strong> 영상
          </span>
        </div>
      </div>
    </section>
  );
}
