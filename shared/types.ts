export interface NewsItem {
  id?: string;
  title: string;
  description?: string;
  url: string;
  source: string;
  imageUrl?: string;
  summary?: string;
  publishedAt: Date | string;
}

export interface VideoItem {
  id?: string;
  videoId: string;
  title: string;
  description?: string;
  thumbnailUrl?: string;
  channelTitle: string;
  summary?: string;
  publishedAt: Date | string;
}

export interface SearchResult {
  news: NewsItem[];
  videos: VideoItem[];
  summary?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
