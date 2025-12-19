import { Router, Request, Response } from 'express';
import { searchYouTubeVideos, getYouTubeVideoUrl } from '../services/youtubeService.js';
import { summarizeVideo } from '../services/summaryService.js';
import type { ApiResponse, VideoItem } from '../types/index.js';

const router = Router();

// 유튜브 영상 검색
router.get('/', async (req: Request, res: Response) => {
  try {
    const keyword = (req.query.keyword as string) || '쿠팡';
    const maxResults = parseInt(req.query.maxResults as string) || 20;

    const videos = await searchYouTubeVideos(keyword, maxResults);

    const response: ApiResponse<VideoItem[]> = {
      success: true,
      data: videos,
      message: `${videos.length}개의 영상을 가져왔습니다.`
    };

    res.json(response);
  } catch (error) {
    const response: ApiResponse<null> = {
      success: false,
      error: '유튜브 영상을 검색하는 중 오류가 발생했습니다.'
    };
    res.status(500).json(response);
  }
});

// 영상 URL 가져오기
router.get('/url/:videoId', (req: Request, res: Response) => {
  const { videoId } = req.params;

  const response: ApiResponse<{ url: string; embedUrl: string }> = {
    success: true,
    data: {
      url: getYouTubeVideoUrl(videoId),
      embedUrl: `https://www.youtube.com/embed/${videoId}`
    }
  };

  res.json(response);
});

// 개별 영상 요약
router.post('/summarize', async (req: Request, res: Response) => {
  try {
    const videoItem: VideoItem = req.body;

    if (!videoItem || !videoItem.title) {
      const response: ApiResponse<null> = {
        success: false,
        error: '영상 정보가 필요합니다.'
      };
      return res.status(400).json(response);
    }

    const summary = await summarizeVideo(videoItem);

    const response: ApiResponse<{ summary: string }> = {
      success: true,
      data: { summary }
    };

    res.json(response);
  } catch (error) {
    const response: ApiResponse<null> = {
      success: false,
      error: '영상 요약을 생성하는 중 오류가 발생했습니다.'
    };
    res.status(500).json(response);
  }
});

export default router;
