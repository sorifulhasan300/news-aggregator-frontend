"use client";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import NewsCard from "@/components/NewsCard";
import { Article } from "@/types/types";

export default function Home() {
  const [news, setNews] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filters, setFilters] = useState({
    category: "",
    language: "",
    startDate: "",
    endDate: "",
    search: "",
  });

  const fetchNews = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/api/news`, {
        params: {
          category: filters.category || undefined,
          language: filters.language || undefined,
          startDate: filters.startDate || undefined,
          endDate: filters.endDate || undefined,
          q: filters.search || undefined,
        },
      });
      setNews(res.data);
    } catch (err) {
      console.error("Error fetching news:", err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchNews();
    }, 500);

    return () => clearTimeout(timer);
  }, [fetchNews]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Latest News</h1>

      <div className="flex flex-wrap gap-4 mb-8">
        <div className="flex-1 min-w-[300px]">
          <input
            type="text"
            placeholder="Search news by title or content..."
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
          />
        </div>

        <select
          onChange={(e) => handleFilterChange("category", e.target.value)}
          className="p-2 border rounded-lg bg-white"
        >
          <option value="">All Categories</option>
          <option value="technology">Technology</option>
          <option value="business">Business</option>
          <option value="politics">Politics</option>
          <option value="sports">Sports</option>
        </select>

        <input
          type="date"
          className="p-2 border rounded-lg"
          onChange={(e) => handleFilterChange("startDate", e.target.value)}
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p className="animate-pulse text-lg font-medium text-gray-500">
            Loading news...
          </p>
        </div>
      ) : (
        <>
          {news.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {news.map((item) => (
                <NewsCard key={item.article_id} article={item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-gray-500">
              No news found matching your search.
            </div>
          )}
        </>
      )}
    </div>
  );
}
