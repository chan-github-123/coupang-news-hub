import { useEffect } from 'react';
import { Summary } from '../components/Summary';
import { NewsList } from '../components/NewsList';
import { VideoList } from '../components/VideoList';
import { Loading } from '../components/Loading';
import { useSearch } from '../hooks/useSearch';

interface HomeProps {
  searchKeyword: string;
}

export function Home({ searchKeyword }: HomeProps) {
  const { result, loading, error, search } = useSearch();

  useEffect(() => {
    search(searchKeyword);
  }, [searchKeyword, search]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="error-message">
        <p>{error}</p>
        <button onClick={() => search(searchKeyword)}>다시 시도</button>
      </div>
    );
  }

  if (!result) {
    return <Loading />;
  }

  return (
    <>
      {result.summary && (
        <Summary
          summary={result.summary}
          newsCount={result.news.length}
          videoCount={result.videos.length}
        />
      )}

      <div className="content-grid">
        <NewsList news={result.news} />
        <VideoList videos={result.videos} />
      </div>
    </>
  );
}
