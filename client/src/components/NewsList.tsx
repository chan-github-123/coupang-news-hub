import { NewsCard } from './NewsCard';
import type { NewsItem } from '../types';

interface NewsListProps {
  news: NewsItem[];
}

export function NewsList({ news }: NewsListProps) {
  if (news.length === 0) {
    return (
      <section className="news-section">
        <h2>뉴스</h2>
        <p className="empty-message">뉴스가 없습니다.</p>
      </section>
    );
  }

  return (
    <section className="news-section">
      <h2>뉴스 <span className="count">({news.length})</span></h2>
      <div className="news-grid">
        {news.map((item, index) => (
          <NewsCard key={item.id || `news-${index}`} news={item} />
        ))}
      </div>
    </section>
  );
}
