import OpenAI from 'openai';
import type { NewsItem, VideoItem } from '../types/index.js';

let openai: OpenAI | null = null;

function getOpenAIClient(): OpenAI | null {
  if (!process.env.OPENAI_API_KEY) {
    return null;
  }
  if (!openai) {
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
  }
  return openai;
}

export async function summarizeText(text: string): Promise<string> {
  const client = getOpenAIClient();

  if (!client) {
    return createSimpleSummary(text);
  }

  try {
    const response = await client.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: '당신은 뉴스 요약 전문가입니다. 주어진 텍스트를 한국어로 2-3문장으로 간결하게 요약해주세요.'
        },
        {
          role: 'user',
          content: `다음 내용을 요약해주세요:\n\n${text}`
        }
      ],
      max_tokens: 200,
      temperature: 0.5
    });

    return response.choices[0]?.message?.content || createSimpleSummary(text);
  } catch (error) {
    console.error('OpenAI 요약 오류:', error);
    return createSimpleSummary(text);
  }
}

export async function summarizeNews(news: NewsItem): Promise<string> {
  const textToSummarize = `제목: ${news.title}\n내용: ${news.description || ''}`;
  return summarizeText(textToSummarize);
}

export async function summarizeVideo(video: VideoItem): Promise<string> {
  const textToSummarize = `제목: ${video.title}\n설명: ${video.description || ''}`;
  return summarizeText(textToSummarize);
}

export async function summarizeMultipleNews(newsItems: NewsItem[]): Promise<string> {
  const client = getOpenAIClient();

  const newsText = newsItems
    .slice(0, 10)
    .map((n, i) => `${i + 1}. ${n.title}`)
    .join('\n');

  if (!client) {
    return `오늘의 쿠팡 관련 주요 뉴스 ${newsItems.length}건이 수집되었습니다. 주요 키워드: 쿠팡, 이커머스, 물류, 주식`;
  }

  try {
    const response = await client.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: '당신은 뉴스 분석 전문가입니다. 여러 뉴스 제목을 보고 전체적인 트렌드와 주요 이슈를 한국어로 3-4문장으로 요약해주세요.'
        },
        {
          role: 'user',
          content: `다음은 쿠팡 관련 최신 뉴스 제목들입니다. 전체적인 트렌드를 요약해주세요:\n\n${newsText}`
        }
      ],
      max_tokens: 300,
      temperature: 0.5
    });

    return response.choices[0]?.message?.content ||
      `오늘의 쿠팡 관련 주요 뉴스 ${newsItems.length}건이 수집되었습니다.`;
  } catch (error) {
    console.error('뉴스 종합 요약 오류:', error);
    return `오늘의 쿠팡 관련 주요 뉴스 ${newsItems.length}건이 수집되었습니다.`;
  }
}

function createSimpleSummary(text: string): string {
  // API 키가 없을 때 간단한 요약 생성
  const sentences = text.split(/[.!?]/);
  const firstSentence = sentences[0]?.trim();

  if (firstSentence && firstSentence.length > 10) {
    return firstSentence.length > 100
      ? firstSentence.substring(0, 100) + '...'
      : firstSentence;
  }

  return text.length > 100 ? text.substring(0, 100) + '...' : text;
}
