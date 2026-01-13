
import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AdminService } from '../services/AdminService';
import { BlogService } from '../services/BlogService';
import { InteractionService } from '../services/InteractionService';

/**
 * AdminController (Controller)
 * Yönetim panelinin durumunu ve kullanıcı eylemlerini yönetir.
 * SRP: Sadece yönetim paneli verilerinin koordinasyonundan sorumludur.
 */
export const useAdminController = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isReady, setIsReady] = useState(false);
  const [stats, setStats] = useState({ posts: 0, likes: 0, subs: 0, views: '0' });
  const [posts, setPosts] = useState<any[]>([]);
  const [subscribers, setSubscribers] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Verileri yükleme ve yenileme fonksiyonu (View'ı Model ile senkronize eder)
  const loadData = useCallback(() => {
    const allPosts = BlogService.getAllPosts();
    const interactionStats = InteractionService.getTotalStats();
    const allSubscribers = InteractionService.getSubscribers();
    
    setPosts(allPosts);
    setSubscribers(allSubscribers);
    setStats({
      posts: allPosts.length,
      likes: interactionStats.likes,
      subs: interactionStats.subs,
      views: interactionStats.views as string
    });
  }, []);

  // Kimlik doğrulama kontrolü
  useEffect(() => {
    if (!AdminService.isAuthenticated()) {
      if (location.pathname !== '/admin/login') {
        navigate('/admin/login');
      }
    } else {
      setIsReady(true);
    }
  }, [navigate, location.pathname]);

  // Sayfa hazır olduğunda verileri yükle
  useEffect(() => {
    if (isReady) {
      loadData();
    }
  }, [isReady, loadData]);

  const handleLogout = () => {
    AdminService.logout();
    navigate('/');
  };

  /**
   * Yazı silme işlemi (Action)
   * 1. Kullanıcıdan onay alır.
   * 2. Model'den (Storage) veriyi siler.
   * 3. Controller state'ini güncelleyerek View'ı anında yeniler.
   */
  const handleDeletePost = (id: number, title: string) => {
    const isConfirmed = window.confirm(`Bu yazıyı silmek istediğinizden emin misiniz?\n\nYazı: ${title}`);
    
    if (isConfirmed) {
      // Model seviyesinde silme
      BlogService.deletePost(id);
      
      // View'ı güncellemek için Controller state'ini tazele
      loadData();
      
      alert('Yazı başarıyla silindi.');
    }
  };

  const handleRemoveSubscriber = (email: string) => {
    if (window.confirm(`${email} adresini abonelikten çıkarmak istediğinize emin misiniz?`)) {
      InteractionService.removeSubscriber(email);
      loadData();
    }
  };

  // Arama filtresi
  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return {
    isReady,
    stats,
    posts: filteredPosts,
    searchTerm,
    setSearchTerm,
    subscribers,
    currentPath: location.pathname,
    handleLogout,
    handleDeletePost,
    handleRemoveSubscriber,
    refreshData: loadData
  };
};
