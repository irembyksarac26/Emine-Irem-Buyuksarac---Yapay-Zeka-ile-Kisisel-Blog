
import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { BlogService } from '../services/BlogService';
import { UserService } from '../services/UserService';
import { ThemeService } from '../services/ThemeService';
import { InteractionService } from '../services/InteractionService';

export const useHomeController = (postIdOverride?: number) => {
  const postData = postIdOverride ? BlogService.getPostById(postIdOverride)! : BlogService.getFeaturedPost();
  const postId = postData.id; 

  // States
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isAnimate, setIsAnimate] = useState(false);
  const [copyStatus, setCopyStatus] = useState('Linki Kopyala');
  const [showToast, setShowToast] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [subCount, setSubCount] = useState(0);
  const [subMessage, setSubMessage] = useState({ text: '', type: '' });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [lastRead, setLastRead] = useState<{ postId: number, title: string } | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    setLikes(InteractionService.getLikes(postId));
    setIsLiked(InteractionService.hasLiked(postId));
    setSubCount(InteractionService.getSubscribers().length);
    setIsBookmarked(InteractionService.isBookmarked(postId));
    
    const history = InteractionService.getLastRead();
    if (history && history.postId === postId) {
      setLastRead(history);
    }

    InteractionService.saveLastRead(postId, postData.title);

    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [postId]);

  const handleLike = () => {
    if (!isLiked) {
      const result = InteractionService.toggleLike(postId);
      setLikes(result.count);
      setIsLiked(result.liked);
      
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.8 },
        colors: ['#8b5cf6', '#d946ef', '#ec4899', '#f59e0b', '#3b82f6'],
        disableForReducedMotion: true
      });

      setIsAnimate(true);
      setTimeout(() => setIsAnimate(false), 300);
    }
  };

  const handleBookmark = () => {
    const saved = InteractionService.toggleBookmark({
      id: postId,
      title: postData.title,
      excerpt: postData.intro.substring(0, 100) + "...",
      date: postData.date,
      readTime: postData.readTime,
      image: postData.heroImage
    });
    setIsBookmarked(saved);
  };

  const handleBookmarkOther = (post: any) => {
    InteractionService.toggleBookmark(post);
  };

  const handleShareTwitter = () => {
    const shareUrl = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(postData.title);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${shareUrl}`, '_blank');
  };

  const handleShareLinkedIn = () => {
    const shareUrl = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`, '_blank');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopyStatus('✓ Kopyalandı!');
    setShowToast(true);
    
    setTimeout(() => {
      setCopyStatus('Linki Kopyala');
      setShowToast(false);
    }, 2000);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError('');
    setSubMessage({ text: '', type: '' });

    const result = InteractionService.subscribe(email);
    
    if (!result.success) {
      setEmailError(result.message);
      setSubMessage({ text: '', type: '' });
    } else {
      setSubMessage({ text: result.message, type: 'success' });
      setSubCount(result.count);
      setEmail('');
    }
  };

  const handleEmailChange = (val: string) => {
    setEmail(val);
    if (emailError) setEmailError('');
  };

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight * 0.4,
      behavior: 'smooth'
    });
    setLastRead(null);
  };

  return {
    post: { ...postData },
    relatedPosts: BlogService.getAllPosts()
      .filter(p => p.id !== postId)
      .map(p => ({
        id: p.id,
        title: p.title,
        excerpt: p.intro,
        date: p.date,
        readTime: p.readTime,
        image: p.heroImage,
        isBookmarked: InteractionService.isBookmarked(p.id)
      })),
    user: UserService.getUserInfo(),
    dimensions: ThemeService.getDimensions(),
    scrollProgress,
    lastRead,
    scrollToContent,
    interactions: {
      likes,
      isLiked,
      isAnimate,
      isBookmarked,
      handleLike,
      handleBookmark,
      handleBookmarkOther,
      copyStatus,
      showToast,
      handleShareTwitter,
      handleShareLinkedIn,
      handleCopyLink,
    },
    subscription: {
      email,
      emailError,
      setEmail: handleEmailChange,
      subCount,
      subMessage,
      handleSubscribe,
    }
  };
};
