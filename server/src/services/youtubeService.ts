import axios from 'axios';
import type { VideoItem } from '../types/index.js';

const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3';

interface YouTubeSearchItem {
  id: { videoId: string };
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      high: { url: string };
      medium: { url: string };
      default: { url: string };
    };
    channelTitle: string;
    publishedAt: string;
  };
}

export async function searchYouTubeVideos(
  keyword: string = '쿠팡',
  maxResults: number = 20
): Promise<VideoItem[]> {
  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!apiKey) {
    console.warn('YouTube API 키가 설정되지 않았습니다. 목업 데이터를 반환합니다.');
    return getMockYouTubeVideos(keyword);
  }

  try {
    const response = await axios.get(`${YOUTUBE_API_BASE}/search`, {
      params: {
        part: 'snippet',
        q: keyword,
        type: 'video',
        order: 'date',
        maxResults,
        regionCode: 'KR',
        relevanceLanguage: 'ko',
        key: apiKey
      }
    });

    const items: VideoItem[] = response.data.items.map((item: YouTubeSearchItem) => ({
      videoId: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnailUrl: item.snippet.thumbnails.high?.url ||
                    item.snippet.thumbnails.medium?.url ||
                    item.snippet.thumbnails.default?.url,
      channelTitle: item.snippet.channelTitle,
      publishedAt: new Date(item.snippet.publishedAt)
    }));

    return items;
  } catch (error) {
    console.error('YouTube 검색 오류:', error);
    return getMockYouTubeVideos(keyword);
  }
}

function getMockYouTubeVideos(keyword: string): VideoItem[] {
  return [
    {
      videoId: 'mock1',
      title: `${keyword} 관련 최신 뉴스 분석`,
      description: `${keyword}의 최근 동향과 시장 분석을 다룹니다.`,
      thumbnailUrl: 'https://via.placeholder.com/480x360?text=Video+1',
      channelTitle: '경제 뉴스 채널',
      publishedAt: new Date()
    },
    {
      videoId: 'mock2',
      title: `${keyword} 투자 전망 2024`,
      description: `${keyword} 주식 분석 및 향후 전망`,
      thumbnailUrl: 'https://via.placeholder.com/480x360?text=Video+2',
      channelTitle: '투자 분석 채널',
      publishedAt: new Date(Date.now() - 86400000)
    },
    {
      videoId: 'mock3',
      title: `${keyword} 물류 센터 탐방`,
      description: `${keyword}의 첨단 물류 시스템을 살펴봅니다.`,
      thumbnailUrl: 'https://via.placeholder.com/480x360?text=Video+3',
      channelTitle: 'IT 테크 리뷰',
      publishedAt: new Date(Date.now() - 172800000)
    }
  ];
}

export function getYouTubeVideoUrl(videoId: string): string {
  return `https://www.youtube.com/watch?v=${videoId}`;
}

export function getYouTubeEmbedUrl(videoId: string): string {
  return `https://www.youtube.com/embed/${videoId}`;
}
