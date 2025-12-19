import { useState, useCallback } from 'react';
import { searchAll } from '../services/api';
import type { SearchResult } from '../types';

export function useSearch() {
  const [result, setResult] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(async (keyword: string) => {
    setLoading(true);
    setError(null);

    try {
      const data = await searchAll(keyword);
      setResult(data);
    } catch (err) {
      setError('검색 중 오류가 발생했습니다.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { result, loading, error, search };
}
