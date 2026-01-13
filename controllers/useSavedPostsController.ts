
import { useState, useEffect } from 'react';
import { InteractionService } from '../services/InteractionService';
import { ThemeService } from '../services/ThemeService';

export const useSavedPostsController = () => {
  const [savedPosts, setSavedPosts] = useState<any[]>([]);
  const theme = ThemeService.getColors();

  useEffect(() => {
    setSavedPosts(InteractionService.getSavedPosts());
  }, []);

  const handleRemove = (postId: number) => {
    const post = savedPosts.find(p => p.id === postId);
    if (post) {
      InteractionService.toggleBookmark(post);
      setSavedPosts(InteractionService.getSavedPosts());
    }
  };

  return {
    savedPosts,
    theme,
    handleRemove
  };
};
