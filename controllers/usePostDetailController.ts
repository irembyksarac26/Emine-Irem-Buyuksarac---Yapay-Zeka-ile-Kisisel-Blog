
import { useParams, useNavigate } from 'react-router-dom';
import { BlogService } from '../services/BlogService';
import { useEffect, useState } from 'react';
import { FeaturedPost } from '../models/Post';

export const usePostDetailController = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<FeaturedPost | null>(null);

  useEffect(() => {
    if (id) {
      const found = BlogService.getPostById(parseInt(id));
      if (found) {
        setPost(found);
      } else {
        navigate('/');
      }
    }
  }, [id, navigate]);

  return { post };
};
