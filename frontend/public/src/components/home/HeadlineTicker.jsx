import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { newsService } from '../../services/newsService';
import SectionContainer from '../shared/SectionContainer';

const HeadlineTicker = () => {
  const [news, setNews] = useState([]);
  const [tickerIndex, setTickerIndex] = useState(0);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await newsService.getNews(1, 5); // Get 5 latest news for ticker
        if (response?.data && response.data.length > 0) {
          setNews(response.data);
        }
      } catch (error) {
        console.error('Error fetching news for ticker:', error);
      }
    };
    fetchNews();
  }, []);

  // Ticker animation
  useEffect(() => {
    if (news.length <= 1) return;
    const tickerTimer = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % news.length);
    }, 4000); // Change headline every 4 seconds
    return () => clearInterval(tickerTimer);
  }, [news.length]);

  if (news.length === 0) return null;

  const currentTicker = news[tickerIndex];

  return (
    <SectionContainer background="white" className="pt-6 pb-2 border-b border-border-subtle">
      <div className="flex items-center bg-gray-50 border border-gray-200 rounded-full overflow-hidden shadow-sm">
        <div className="bg-brand-primary text-white font-bold px-5 py-2 text-sm md:text-base shrink-0 uppercase tracking-wider">
          Headline
        </div>
        <div className="px-4 w-full overflow-hidden relative h-10">
          {news.map((item, index) => (
            <Link 
              key={item.id}
              to={`/berita/${item.slug}`} 
              className={`absolute inset-0 flex items-center text-gray-700 hover:text-brand-primary font-medium hover:underline transition-all duration-500 ease-in-out truncate w-full px-4 ${
                index === tickerIndex 
                  ? 'translate-y-0 opacity-100 z-10' 
                  : index < tickerIndex 
                    ? '-translate-y-full opacity-0' 
                    : 'translate-y-full opacity-0'
              }`}
              title={item.title}
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
};

export default HeadlineTicker;
