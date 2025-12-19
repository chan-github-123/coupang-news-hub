import { VideoCard } from './VideoCard';
import type { VideoItem } from '../types';

interface VideoListProps {
  videos: VideoItem[];
}

export function VideoList({ videos }: VideoListProps) {
  if (videos.length === 0) {
    return (
      <section className="video-section">
        <h2>유튜브 영상</h2>
        <p className="empty-message">영상이 없습니다.</p>
      </section>
    );
  }

  return (
    <section className="video-section">
      <h2>유튜브 영상 <span className="count">({videos.length})</span></h2>
      <div className="video-grid">
        {videos.map((video, index) => (
          <VideoCard key={video.id || `video-${index}`} video={video} />
        ))}
      </div>
    </section>
  );
}
