import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import newsRoutes from './routes/news.js';
import youtubeRoutes from './routes/youtube.js';
import searchRoutes from './routes/search.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// 미들웨어
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());

// 라우트
app.use('/api/news', newsRoutes);
app.use('/api/youtube', youtubeRoutes);
app.use('/api/search', searchRoutes);

// 헬스 체크
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: '서버가 정상적으로 실행 중입니다.',
    timestamp: new Date().toISOString()
  });
});

// 에러 핸들링
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('서버 오류:', err);
  res.status(500).json({
    success: false,
    error: '서버 내부 오류가 발생했습니다.'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 서버가 포트 ${PORT}에서 실행 중입니다.`);
  console.log(`📰 뉴스 API: http://localhost:${PORT}/api/news`);
  console.log(`📺 유튜브 API: http://localhost:${PORT}/api/youtube`);
  console.log(`🔍 통합 검색: http://localhost:${PORT}/api/search`);
});
