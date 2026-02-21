import Link from "next/link";
import Image from "next/image";
import { Article } from "@/types/types";

export default function NewsCard({ article }: { article: Article }) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
      {article.image_url && (
        <Image
          src={article.image_url}
          alt={article.title}
          className="object-cover"
          width={800}
          height={450}
        />
      )}
      <div className="p-4">
        <h2 className="font-bold text-lg mb-2 line-clamp-2">{article.title}</h2>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {article.description}
        </p>
        <div className="flex justify-between items-center text-xs text-gray-400">
          <span>{article.source_name}</span>
          <span>{new Date(article.pubDate).toLocaleDateString()}</span>
        </div>
        <Link href={`/news/${article.article_id}`}>
          <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
            Read More
          </button>
        </Link>
      </div>
    </div>
  );
}
