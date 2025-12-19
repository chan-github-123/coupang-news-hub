import type { VideoItem } from '../types';

interface VideoCardProps {
  video: VideoItem;
}

export function VideoCard({ video }: VideoCardProps) {
  const videoUrl = `https://www.youtube.com/watch?v=${video.videoId}`;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <article className="video-card">
      <a href={videoUrl} target="_blank" rel="noopener noreferrer" className="video-thumbnail">
        {video.thumbnailUrl ? (
          <img src={video.thumbnailUrl} alt={video.title} loading="lazy" />
        ) : (
          <div className="video-placeholder">
            <span>▶</span>
          </div>
        )}
        <div className="video-play-icon">▶</div>
      </a>
      <div className="video-content">
        <span className="video-channel">{video.channelTitle}</span>
        <h3 className="video-title">
          <a href={videoUrl} target="_blank" rel="noopener noreferrer">
            {video.title}
          </a>
        </h3>
        {video.description && (
          <p className="video-description">{video.description}</p>
        )}
        <time className="video-date">{formatDate(video.publishedAt)}</time>
      </div>
    </article>
  );
}
