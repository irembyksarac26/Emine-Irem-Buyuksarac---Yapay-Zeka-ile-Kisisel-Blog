
export class InteractionService {
  private static LIKE_COUNT_PREFIX = 'begeni_yazi_';
  private static LIKED_STATUS_PREFIX = 'begendi_yazi_';
  private static SUBSCRIBERS_KEY = 'aboneler';
  private static LAST_READ_KEY = 'son_okunan_yazi';
  private static BOOKMARKS_KEY = 'kaydedilen_yazilar';
  private static VIEWS_KEY = 'toplam_goruntulenme';

  static getLikes(postId: number): number {
    const count = localStorage.getItem(`${this.LIKE_COUNT_PREFIX}${postId}`);
    return count ? parseInt(count, 10) : 5;
  }

  static hasLiked(postId: number): boolean {
    return localStorage.getItem(`${this.LIKED_STATUS_PREFIX}${postId}`) === 'true';
  }

  static toggleLike(postId: number): { count: number; liked: boolean } {
    let currentCount = this.getLikes(postId);
    const currentlyLiked = this.hasLiked(postId);
    if (currentlyLiked) return { count: currentCount, liked: true };
    currentCount += 1;
    localStorage.setItem(`${this.LIKE_COUNT_PREFIX}${postId}`, currentCount.toString());
    localStorage.setItem(`${this.LIKED_STATUS_PREFIX}${postId}`, 'true');
    return { count: currentCount, liked: true };
  }

  static clearPostData(postId: number): void {
    localStorage.removeItem(`${this.LIKE_COUNT_PREFIX}${postId}`);
    localStorage.removeItem(`${this.LIKED_STATUS_PREFIX}${postId}`);
    // Kaydedilenlerden de kaldır
    let saved = this.getSavedPosts();
    saved = saved.filter(p => p.id !== postId);
    localStorage.setItem(this.BOOKMARKS_KEY, JSON.stringify(saved));
  }

  static getSubscribers(): string[] {
    const data = localStorage.getItem(this.SUBSCRIBERS_KEY);
    return data ? JSON.parse(data) : ["irem@test.com", "yazilim@test.com"]; 
  }

  static removeSubscriber(email: string) {
    let subs = this.getSubscribers();
    subs = subs.filter(s => s !== email);
    localStorage.setItem(this.SUBSCRIBERS_KEY, JSON.stringify(subs));
  }

  static subscribe(email: string): { success: boolean; message: string; count: number } {
    const subscribers = this.getSubscribers();
    const trimmedEmail = email.trim();
    if (!trimmedEmail) return { success: false, message: 'E-posta boş olamaz!', count: subscribers.length };
    if (!trimmedEmail.includes('@')) return { success: false, message: 'Geçersiz e-posta!', count: subscribers.length };
    if (subscribers.includes(trimmedEmail)) return { success: false, message: 'Zaten kayıtlı.', count: subscribers.length };
    const newSubscribers = [...subscribers, trimmedEmail];
    localStorage.setItem(this.SUBSCRIBERS_KEY, JSON.stringify(newSubscribers));
    return { success: true, message: 'Abone olundu.', count: newSubscribers.length };
  }

  static saveLastRead(postId: number, title: string) {
    localStorage.setItem(this.LAST_READ_KEY, JSON.stringify({ postId, title, timestamp: Date.now() }));
  }

  static getLastRead(): any {
    const data = localStorage.getItem(this.LAST_READ_KEY);
    return data ? JSON.parse(data) : null;
  }

  static getSavedPosts(): any[] {
    const data = localStorage.getItem(this.BOOKMARKS_KEY);
    return data ? JSON.parse(data) : [];
  }

  static isBookmarked(postId: number): boolean {
    return this.getSavedPosts().some(p => p.id === postId);
  }

  static toggleBookmark(post: any): boolean {
    let saved = this.getSavedPosts();
    const exists = saved.some(p => p.id === post.id);
    if (exists) saved = saved.filter(p => p.id !== post.id);
    else saved.push(post);
    localStorage.setItem(this.BOOKMARKS_KEY, JSON.stringify(saved));
    return !exists;
  }

  static getTotalStats() {
    const subs = this.getSubscribers().length;
    const views = localStorage.getItem(this.VIEWS_KEY) || '1,240';
    const likes = 42; 
    return { subs, views, likes };
  }
}
