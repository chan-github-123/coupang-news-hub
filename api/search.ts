import type { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';
import * as cheerio from 'cheerio';

interface NewsItem {
  title: string;
  description?: string;
  url: string;
  source: string;
  imageUrl?: string;
  publishedAt: Date;
}

interface VideoItem {
  videoId: string;
  title: string;
  description?: string;
  thumbnailUrl?: string;
  channelTitle: string;
  publishedAt: Date;
}

async function fetchGoogleNews(keyword: string): Promise<NewsItem[]> {
  try {
    const encodedKeyword = encodeURIComponent(keyword);
    const url = `https://news.google.com/rss/search?q=${encodedKeyword}&hl=ko&gl=KR&ceid=KR:ko`;

    const response = await axios.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
      timeout: 10000
    });

    const $ = cheerio.load(response.data, { xmlMode: true });
    const items: NewsItem[] = [];

    $('item').slice(0, 15).each((_, element) => {
      const title = $(element).find('title').text();
      const link = $(element).find('link').text();
      const pubDate = $(element).find('pubDate').text();
      const source = $(element).find('source').text() || 'Google News';

      if (title && link) {
        items.push({ title, url: link, source, publishedAt: new Date(pubDate), description: '' });
      }
    });

    return items;
  } catch {
    return [];
  }
}

function getMockVideos(keyword: string): VideoItem[] {
  return [
    {
      videoId: 'mock1',
      title: `${keyword} 관련 최신 뉴스 분석`,
      description: `${keyword}의 최근 동향과 시장 분석`,
      thumbnailUrl: 'https://via.placeholder.com/480x360/e31837/ffffff?text=Video+1',
      channelTitle: '경제 뉴스 채널',
      publishedAt: new Date()
    },
    {
      videoId: 'mock2',
      title: `${keyword} 투자 전망`,
      description: `${keyword} 주식 분석 및 전망`,
      thumbnailUrl: 'https://via.placeholder.com/480x360/e31837/ffffff?text=Video+2',
      channelTitle: '투자 분석',
      publishedAt: new Date(Date.now() - 86400000)
    },
    {
      videoId: 'mock3',
      title: `${keyword} 서비스 리뷰`,
      description: `${keyword} 서비스 사용 후기`,
      thumbnailUrl: 'https://via.placeholder.com/480x360/e31837/ffffff?text=Video+3',
      channelTitle: '리뷰 채널',
      publishedAt: new Date(Date.now() - 172800000)
    }
  ];
}

function createSummary(news: NewsItem[]): string {
  if (news.length === 0) return '수집된 뉴스가 없습니다.';

  const topics = news.slice(0, 5).map(n => n.title).join(' ');

  if (topics.includes('주가') || topics.includes('주식') || topics.includes('상장')) {
    return `오늘 쿠팡 관련 ${news.length}건의 뉴스가 수집되었습니다. 주요 키워드는 주식, 투자, 실적 관련 소식입니다.`;
  } else if (topics.includes('배송') || topics.includes('물류')) {
    return `오늘 쿠팡 관련 ${news.length}건의 뉴스가 수집되었습니다. 물류 및 배송 서비스 관련 소식이 주목받고 있습니다.`;
  } else if (topics.includes('이츠') || topics.includes('플레이')) {
    return `오늘 쿠팡 관련 ${news.length}건의 뉴스가 수집되었습니다. 쿠팡이츠, 쿠팡플레이 등 신규 서비스 관련 소식입니다.`;
  }

  return `오늘 쿠팡 관련 ${news.length}건의 뉴스가 수집되었습니다. 이커머스 시장 동향과 기업 소식을 확인해보세요.`;
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

    const news = await fetchGoogleNews(keyword);
    const videos = getMockVideos(keyword);
    const summary = createSummary(news);

    return res.status(200).json({
      success: true,
      data: {
        news,
        videos,
        summary
      },
      message: `뉴스 ${news.length}개, 영상 ${videos.length}개를 가져왔습니다.`
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: '검색 중 오류가 발생했습니다.'
    });
  }
}
