import { Router, Request, Response } from 'express';
import { fetchAllNews, fetchGoogleNews, fetchNaverNews } from '../services/newsService.js';
import { summarizeNews, summarizeMultipleNews } from '../services/summaryService.js';
import type { ApiResponse, NewsItem } from '../types/index.js';

const router = Router();

// 모든 뉴스 가져오기
router.get('/', async (req: Request, res: Response) => {
  try {
    const keyword = (req.query.keyword as string) || '쿠팡';
    const news = await fetchAllNews(keyword);

    const response: ApiResponse<NewsItem[]> = {
      success: true,
      data: news,
      message: `${news.length}개의 뉴스를 가져왔습니다.`
    };

    res.json(response);
  } catch (error) {
    const response: ApiResponse<null> = {
      success: false,
      error: '뉴스를 가져오는 중 오류가 발생했습니다.'
    };
    res.status(500).json(response);
  }
});

// Google 뉴스만 가져오기
router.get('/google', async (req: Request, res: Response) => {
  try {
    const keyword = (req.query.keyword as string) || '쿠팡';
    const news = await fetchGoogleNews(keyword);

    const response: ApiResponse<NewsItem[]> = {
      success: true,
      data: news
    };

    res.json(response);
  } catch (error) {
    const response: ApiResponse<null> = {
      success: false,
      error: 'Google 뉴스를 가져오는 중 오류가 발생했습니다.'
    };
    res.status(500).json(response);
  }
});

// Naver 뉴스만 가져오기
router.get('/naver', async (req: Request, res: Response) => {
  try {
    const keyword = (req.query.keyword as string) || '쿠팡';
    const news = await fetchNaverNews(keyword);

    const response: ApiResponse<NewsItem[]> = {
      success: true,
      data: news
    };

    res.json(response);
  } catch (error) {
    const response: ApiResponse<null> = {
      success: false,
      error: 'Naver 뉴스를 가져오는 중 오류가 발생했습니다.'
    };
    res.status(500).json(response);
  }
});

// 뉴스 요약 가져오기
router.get('/summary', async (req: Request, res: Response) => {
  try {
    const keyword = (req.query.keyword as string) || '쿠팡';
    const news = await fetchAllNews(keyword);
    const summary = await summarizeMultipleNews(news);

    const response: ApiResponse<{ summary: string; newsCount: number }> = {
      success: true,
      data: {
        summary,
        newsCount: news.length
      }
    };

    res.json(response);
  } catch (error) {
    const response: ApiResponse<null> = {
      success: false,
      error: '뉴스 요약을 생성하는 중 오류가 발생했습니다.'
    };
    res.status(500).json(response);
  }
});

// 개별 뉴스 요약
router.post('/summarize', async (req: Request, res: Response) => {
  try {
    const newsItem: NewsItem = req.body;

    if (!newsItem || !newsItem.title) {
      const response: ApiResponse<null> = {
        success: false,
        error: '뉴스 정보가 필요합니다.'
      };
      return res.status(400).json(response);
    }

    const summary = await summarizeNews(newsItem);

    const response: ApiResponse<{ summary: string }> = {
      success: true,
      data: { summary }
    };

    res.json(response);
  } catch (error) {
    const response: ApiResponse<null> = {
      success: false,
      error: '뉴스 요약을 생성하는 중 오류가 발생했습니다.'
    };
    res.status(500).json(response);
  }
});

export default router;
