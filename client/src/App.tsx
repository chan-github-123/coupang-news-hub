import { useState, useCallback } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Privacy } from './pages/Privacy';
import './App.css';

function App() {
  const [searchKeyword, setSearchKeyword] = useState('쿠팡');
  const [loading, setLoading] = useState(false);

  const handleSearch = useCallback((keyword: string) => {
    setLoading(true);
    setSearchKeyword(keyword);
    // Loading state will be managed by Home component
    setTimeout(() => setLoading(false), 100);
  }, []);

  return (
    <BrowserRouter>
      <div className="app">
        <Header onSearch={handleSearch} loading={loading} />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home searchKeyword={searchKeyword} />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
