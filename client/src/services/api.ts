import axios from 'axios';
import type { ApiResponse, NewsItem, VideoItem, SearchResult } from '../types';

const api = axios.create({
  baseURL: '/api',
  timeout: 30000
});

export async function fetchNews(keyword: string = '쿠팡'): Promise<NewsItem[]> {
  const response = await api.get<ApiResponse<NewsItem[]>>('/news', {
    params: { keyword }
  });
  return response.data.data || [];
}

export async function fetchNewsSummary(keyword: string = '쿠팡'): Promise<{ summary: string; newsCount: number }> {
  const response = await api.get<ApiResponse<{ summary: string; newsCount: number }>>('/news/summary', {
    params: { keyword }
  });
  return response.data.data || { summary: '', newsCount: 0 };
}

export async function fetchVideos(keyword: string = '쿠팡'): Promise<VideoItem[]> {
  const response = await api.get<ApiResponse<VideoItem[]>>('/youtube', {
    params: { keyword }
  });
  return response.data.data || [];
}

export async function searchAll(keyword: string = '쿠팡'): Promise<SearchResult> {
  const response = await api.get<ApiResponse<SearchResult>>('/search/with-summary', {
    params: { keyword }
  });
  return response.data.data || { news: [], videos: [] };
}

export async function summarizeNews(news: NewsItem): Promise<string> {
  const response = await api.post<ApiResponse<{ summary: string }>>('/news/summarize', news);
  return response.data.data?.summary || '';
}

export async function summarizeVideo(video: VideoItem): Promise<string> {
  const response = await api.post<ApiResponse<{ summary: string }>>('/youtube/summarize', video);
  return response.data.data?.summary || '';
}
