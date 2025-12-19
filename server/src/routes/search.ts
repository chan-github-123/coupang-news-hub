import { Router, Request, Response } from 'express';
import { fetchAllNews } from '../services/newsService.js';
import { searchYouTubeVideos } from '../services/youtubeService.js';
import { summarizeMultipleNews } from '../services/summaryService.js';
import type { ApiResponse, SearchResult } from '../types/index.js';

const router = Router();

// 통합 검색 (뉴스 + 유튜브)
router.get('/', async (req: Request, res: Response) => {
  try {
    const keyword = (req.query.keyword as string) || '쿠팡';

    const [news, videos] = await Promise.all([
      fetchAllNews(keyword),
      searchYouTubeVideos(keyword)
    ]);

    const response: ApiResponse<SearchResult> = {
      success: true,
      data: {
        news,
        videos
      },
      message: `뉴스 ${news.length}개, 영상 ${videos.length}개를 가져왔습니다.`
    };

    res.json(response);
  } catch (error) {
    const response: ApiResponse<null> = {
      success: false,
      error: '검색 중 오류가 발생했습니다.'
    };
    res.status(500).json(response);
  }
});

// 통합 검색 + 요약
router.get('/with-summary', async (req: Request, res: Response) => {
  try {
    const keyword = (req.query.keyword as string) || '쿠팡';

    const [news, videos] = await Promise.all([
      fetchAllNews(keyword),
      searchYouTubeVideos(keyword)
    ]);

    const summary = await summarizeMultipleNews(news);

    const response: ApiResponse<SearchResult & { summary: string }> = {
      success: true,
      data: {
        news,
        videos,
        summary
      },
      message: `뉴스 ${news.length}개, 영상 ${videos.length}개를 가져왔습니다.`
    };

    res.json(response);
  } catch (error) {
    const response: ApiResponse<null> = {
      success: false,
      error: '검색 중 오류가 발생했습니다.'
    };
    res.status(500).json(response);
  }
});

export default router;
