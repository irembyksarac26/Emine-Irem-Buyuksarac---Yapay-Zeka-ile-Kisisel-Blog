
import React from 'react';
import { usePostDetailController } from '../controllers/usePostDetailController';
import Home from './Home';

// Not: Home bileşeni şu an FeaturedPost'u gösteriyor. 
// Gerçek bir uygulamada Home ve PostDetail ortak bir ArticleView bileşenini paylaşmalıdır.
// Bu hızlı çözüm için Home'un sunduğu görselliği detay sayfasına uyarlıyoruz.

const PostDetail: React.FC = () => {
  const { post } = usePostDetailController();

  if (!post) return null;

  // Home bileşenini kullanarak içeriği gösteriyoruz 
  // (Home bileşeni useHomeController içinden FeaturedPost alıyor, 
  // bu yüzden detay sayfası için Home'u "post" propsu alacak şekilde güncellememiz gerekebilir
  // ama şu an ana sayfa yapısını bozmadan detay sayfasını bir "Home" varyasyonu olarak düşünebiliriz.)
  
  return <Home overridePostId={post.id} />;
};

export default PostDetail;
