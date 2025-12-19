import type { VercelRequest, VercelResponse } from '@vercel/node';

interface VideoItem {
  videoId: string;
  title: string;
  description?: string;
  thumbnailUrl?: string;
  channelTitle: string;
  publishedAt: Date;
}

function getMockYouTubeVideos(keyword: string): VideoItem[] {
  return [
    {
      videoId: 'mock1',
      title: `${keyword} 관련 최신 뉴스 분석`,
      description: `${keyword}의 최근 동향과 시장 분석을 다룹니다.`,
      thumbnailUrl: 'https://via.placeholder.com/480x360/e31837/ffffff?text=Video+1',
      channelTitle: '경제 뉴스 채널',
      publishedAt: new Date()
    },
    {
      videoId: 'mock2',
      title: `${keyword} 투자 전망 2024`,
      description: `${keyword} 주식 분석 및 향후 전망`,
      thumbnailUrl: 'https://via.placeholder.com/480x360/e31837/ffffff?text=Video+2',
      channelTitle: '투자 분석 채널',
      publishedAt: new Date(Date.now() - 86400000)
    },
    {
      videoId: 'mock3',
      title: `${keyword} 물류 센터 탐방`,
      description: `${keyword}의 첨단 물류 시스템을 살펴봅니다.`,
      thumbnailUrl: 'https://via.placeholder.com/480x360/e31837/ffffff?text=Video+3',
      channelTitle: 'IT 테크 리뷰',
      publishedAt: new Date(Date.now() - 172800000)
    },
    {
      videoId: 'mock4',
      title: `${keyword} 서비스 리뷰`,
      description: `${keyword}의 다양한 서비스를 직접 사용해봤습니다.`,
      thumbnailUrl: 'https://via.placeholder.com/480x360/e31837/ffffff?text=Video+4',
      channelTitle: '리뷰 채널',
      publishedAt: new Date(Date.now() - 259200000)
    },
    {
      videoId: 'mock5',
      title: `${keyword} vs 경쟁사 비교`,
      description: `${keyword}와 다른 이커머스 플랫폼 비교 분석`,
      thumbnailUrl: 'https://via.placeholder.com/480x360/e31837/ffffff?text=Video+5',
      channelTitle: '비교 분석 채널',
      publishedAt: new Date(Date.now() - 345600000)
    }
  ];
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const keyword = (req.query.keyword as string) || '쿠팡';
    const apiKey = process.env.YOUTUBE_API_KEY;

    let videos: VideoItem[];

    if (apiKey) {
      // YouTube API 사용
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(keyword)}&type=video&order=date&maxResults=10&regionCode=KR&relevanceLanguage=ko&key=${apiKey}`
      );
      const data = await response.json();

      if (data.items) {
        videos = data.items.map((item: any) => ({
          videoId: item.id.videoId,
          title: item.snippet.title,
          description: item.snippet.description,
          thumbnailUrl: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default?.url,
          channelTitle: item.snippet.channelTitle,
          publishedAt: new Date(item.snippet.publishedAt)
        }));
      } else {
        videos = getMockYouTubeVideos(keyword);
      }
    } else {
      videos = getMockYouTubeVideos(keyword);
    }

    return res.status(200).json({
      success: true,
      data: videos,
      message: `${videos.length}개의 영상을 가져왔습니다.`
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: '유튜브 영상을 검색하는 중 오류가 발생했습니다.'
    });
  }
}
