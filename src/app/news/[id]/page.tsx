"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { Article } from "@/types/types";

export default function NewsDetails() {
  const params = useParams();
  const router = useRouter();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticleDetails = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/news/${params.id}`,
        );
        setArticle(res.data);
      } catch (err) {
        console.error("Error fetching article:", err);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchArticleDetails();
    }
  }, [params.id]);

  if (loading)
    return (
      <div className="text-center p-20 text-xl">Loading News Details...</div>
    );
  if (!article)
    return <div className="text-center p-20 text-red-500">News not found!</div>;

  return (
    <main className="container mx-auto p-6 max-w-4xl">
      <button
        onClick={() => router.back()}
        className="mb-6 text-blue-600 hover:underline flex items-center gap-2"
      >
        ← Back to Feed
      </button>

      <article className="bg-white rounded-xl shadow-lg overflow-hidden p-8 border border-gray-100">
        <div className="flex gap-2 mb-4">
          {article.category.map((cat: string) => (
            <span
              key={cat}
              className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full uppercase font-bold"
            >
              {cat}
            </span>
          ))}
        </div>

        <h1 className="text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
          {article.title}
        </h1>

        <div className="flex items-center text-gray-500 text-sm mb-8 gap-4 border-b pb-4">
          <p>
            <strong>By:</strong>{" "}
            {article.creator?.join(", ") || "Unknown Author"}
          </p>
          <p>
            <strong>Source:</strong> {article.source_name}
          </p>
          <p>
            <strong>Date:</strong>{" "}
            {new Date(article.pubDate).toLocaleDateString()}
          </p>
        </div>

        {article.image_url && (
          <Image
            src={article.image_url}
            alt={article.title}
            className=" object-cover rounded-lg mb-8 shadow-md"
            width={800}
            height={450}
          />
        )}

        <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed">
          <p className="whitespace-pre-line text-xl">
            {article.content &&
            article.content !== "ONLY AVAILABLE IN PAID PLANS"
              ? article.content
              : article.description}
          </p>
        </div>

        <div className="mt-10 pt-6 border-t">
          <a
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-orange-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-orange-600 transition"
          >
            Read Original Article on {article.source_name}
          </a>
        </div>
      </article>
    </main>
  );
}
