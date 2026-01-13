
export interface PostSection {
  heading: string;
  content: string[];
}

export interface FeaturedPost {
  id: number;
  title: string;
  date: string;
  author: string;
  readTime: string;
  heroImage: string;
  intro: string;
  category: string;
  sections: PostSection[];
  conclusion: string;
  quote?: string;
  likes: number;
  views: number;
  isDraft?: boolean;
}

export interface PostSummary {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image?: string;
  category?: string;
}
