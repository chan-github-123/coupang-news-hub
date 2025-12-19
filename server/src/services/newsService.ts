import axios from 'axios';
import * as cheerio from 'cheerio';
import type { NewsItem } from '../types/index.js';

const NEWS_SOURCES = [
  {
    name: 'Google News',
    url: 'https://news.google.com/rss/search?q=쿠팡&hl=ko&gl=KR&ceid=KR:ko',
    type: 'rss'
  },
  {
    name: 'Naver News',
    url: 'https://search.naver.com/search.naver?where=news&query=쿠팡',
    type: 'html'
  }
];

export async function fetchGoogleNews(keyword: string = '쿠팡'): Promise<NewsItem[]> {
  try {
    const encodedKeyword = encodeURIComponent(keyword);
    const url = `https://news.google.com/rss/search?q=${encodedKeyword}&hl=ko&gl=KR&ceid=KR:ko`;

    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    const $ = cheerio.load(response.data, { xmlMode: true });
    const items: NewsItem[] = [];

    $('item').each((_, element) => {
      const title = $(element).find('title').text();
      const link = $(element).find('link').text();
      const pubDate = $(element).find('pubDate').text();
      const source = $(element).find('source').text() || 'Google News';

      if (title && link) {
        items.push({
          title,
          url: link,
          source,
          publishedAt: new Date(pubDate),
          description: ''
        });
      }
    });

    return items.slice(0, 20);
  } catch (error) {
    console.error('Google News 수집 오류:', error);
    return [];
  }
}

export async function fetchNaverNews(keyword: string = '쿠팡'): Promise<NewsItem[]> {
  try {
    const encodedKeyword = encodeURIComponent(keyword);
    const url = `https://search.naver.com/search.naver?where=news&query=${encodedKeyword}&sort=1`;

    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7'
      }
    });

    const $ = cheerio.load(response.data);
    const items: NewsItem[] = [];

    $('.news_area').each((_, element) => {
      const titleEl = $(element).find('.news_tit');
      const title = titleEl.attr('title') || titleEl.text();
      const link = titleEl.attr('href') || '';
      const description = $(element).find('.news_dsc').text().trim();
      const source = $(element).find('.info_group .press').text() || 'Naver News';
      const imageUrl = $(element).closest('.bx').find('.dsc_thumb img').attr('src');

      if (title && link) {
        items.push({
          title: title.trim(),
          url: link,
          source: source.trim(),
          description,
          imageUrl,
          publishedAt: new Date()
        });
      }
    });

    return items.slice(0, 20);
  } catch (error) {
    console.error('Naver News 수집 오류:', error);
    return [];
  }
}

export async function fetchAllNews(keyword: string = '쿠팡'): Promise<NewsItem[]> {
  const [googleNews, naverNews] = await Promise.all([
    fetchGoogleNews(keyword),
    fetchNaverNews(keyword)
  ]);

  const allNews = [...googleNews, ...naverNews];

  // 중복 제거 (URL 기준)
  const uniqueNews = allNews.reduce((acc, news) => {
    if (!acc.find(n => n.url === news.url)) {
      acc.push(news);
    }
    return acc;
  }, [] as NewsItem[]);

  // 날짜 기준 정렬
  return uniqueNews.sort((a, b) =>
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}
