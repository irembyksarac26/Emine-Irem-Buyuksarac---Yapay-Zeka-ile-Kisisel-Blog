
import { FeaturedPost } from '../models/Post';
import { MOCK_POSTS } from '../constants/user';
import { InteractionService } from './InteractionService';

export class BlogService {
  private static POSTS_KEY = 'blog_posts_full_data';
  private static DRAFTS_KEY = 'blog_posts_drafts';

  static getAllPosts(): FeaturedPost[] {
    const data = localStorage.getItem(this.POSTS_KEY);
    if (!data) {
      const initial: FeaturedPost[] = MOCK_POSTS.map(p => ({
        ...p,
        author: "Emine İrem Büyüksaraç",
        heroImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200",
        intro: p.excerpt,
        category: p.id === 1 ? "Teknoloji" : p.id === 2 ? "Teknoloji" : "Kariyer",
        sections: [{ heading: "Giriş", content: ["Bu yazı içeriği henüz oluşturulmadı."] }],
        conclusion: "Okuduğunuz için teşekkürler.",
        quote: "Kod yazmak bir sanattır.",
        likes: 5,
        views: 120
      }));
      localStorage.setItem(this.POSTS_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(data);
  }

  static getFeaturedPost(): FeaturedPost {
    const all = this.getAllPosts().filter(p => !p.isDraft);
    return all[0];
  }

  static getPostById(id: number): FeaturedPost | undefined {
    return this.getAllPosts().find(p => p.id === id);
  }

  static publishPost(post: Omit<FeaturedPost, 'id' | 'date' | 'likes' | 'views'> & { id?: number }) {
    let posts = this.getAllPosts();
    const isEdit = !!post.id;
    
    const finalPost: FeaturedPost = {
      ...post,
      id: post.id || Math.max(0, ...posts.map(p => p.id)) + 1,
      date: isEdit ? (posts.find(p => p.id === post.id)?.date || this.getTodayDate()) : this.getTodayDate(),
      likes: isEdit ? (posts.find(p => p.id === post.id)?.likes || 0) : 0,
      views: isEdit ? (posts.find(p => p.id === post.id)?.views || 0) : 0,
      isDraft: false
    };

    if (isEdit) {
      posts = posts.map(p => p.id === finalPost.id ? finalPost : p);
    } else {
      posts.unshift(finalPost);
    }
    
    localStorage.setItem(this.POSTS_KEY, JSON.stringify(posts));
    this.removeDraft();
    return finalPost;
  }

  static saveDraft(post: Partial<FeaturedPost>) {
    localStorage.setItem(this.DRAFTS_KEY, JSON.stringify(post));
  }

  static getDraft(): Partial<FeaturedPost> | null {
    const data = localStorage.getItem(this.DRAFTS_KEY);
    return data ? JSON.parse(data) : null;
  }

  static removeDraft() {
    localStorage.removeItem(this.DRAFTS_KEY);
  }

  private static getTodayDate(): string {
    const d = new Date();
    return d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' });
  }

  static deletePost(id: number) {
    let posts = this.getAllPosts();
    posts = posts.filter(p => p.id !== id);
    localStorage.setItem(this.POSTS_KEY, JSON.stringify(posts));
    // Etkileşim verilerini temizle
    InteractionService.clearPostData(id);
  }

  static calculateReadTime(content: string): string {
    const wordsPerMinute = 200;
    const noOfWords = content.split(/\s/g).length;
    const minutes = Math.max(1, Math.ceil(noOfWords / wordsPerMinute));
    return `${minutes} dk okuma`;
  }
}
