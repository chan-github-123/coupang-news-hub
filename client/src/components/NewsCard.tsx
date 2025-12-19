import type { NewsItem } from '../types';

interface NewsCardProps {
  news: NewsItem;
}

export function NewsCard({ news }: NewsCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <article className="news-card">
      {news.imageUrl && (
        <div className="news-image">
          <img src={news.imageUrl} alt={news.title} loading="lazy" />
        </div>
      )}
      <div className="news-content">
        <span className="news-source">{news.source}</span>
        <h3 className="news-title">
          <a href={news.url} target="_blank" rel="noopener noreferrer">
            {news.title}
          </a>
        </h3>
        {news.description && (
          <p className="news-description">{news.description}</p>
        )}
        <time className="news-date">{formatDate(news.publishedAt)}</time>
      </div>
    </article>
  );
}
