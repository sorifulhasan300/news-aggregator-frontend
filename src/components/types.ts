export interface Article {
  article_id: string;
  title: string;
  link: string;
  description: string;
  content: string | null;
  image_url: string | null;
  pubDate: string;
  source_name: string;
  source_id: string | null;
  category: string[];
  language: string;
  country: string[];
  creator: string[] | null;
}
