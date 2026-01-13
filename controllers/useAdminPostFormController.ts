
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BlogService } from '../services/BlogService';
import { FeaturedPost } from '../models/Post';

export const useAdminPostFormController = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<Partial<FeaturedPost>>({
    title: '',
    intro: '',
    category: '',
    heroImage: 'https://picsum.photos/800/400?random=' + Date.now(),
    sections: [{ heading: '', content: [''] }],
    conclusion: '',
    quote: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  useEffect(() => {
    if (id) {
      const existingPost = BlogService.getPostById(parseInt(id));
      if (existingPost) setFormData(existingPost);
    } else {
      const draft = BlogService.getDraft();
      if (draft) setFormData(prev => ({ ...prev, ...draft }));
    }
  }, [id]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title?.trim()) newErrors.title = 'Başlık boş olamaz';
    if (!formData.category) newErrors.category = 'Kategori seçmelisiniz';
    if (!formData.intro?.trim()) newErrors.intro = 'Özet boş olamaz';
    if (formData.intro && formData.intro.length > 200) newErrors.intro = 'Özet 200 karakterden fazla olamaz';
    if (!formData.sections?.[0]?.content?.[0]?.trim()) newErrors.content = 'İçerik boş olamaz';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const updateField = (field: keyof FeaturedPost, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleSaveDraft = () => {
    setSaveStatus('saving');
    BlogService.saveDraft(formData);
    setTimeout(() => {
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    }, 500);
  };

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const fullText = formData.sections?.map(s => s.heading + ' ' + s.content.join(' ')).join(' ') || '';
    const readTime = BlogService.calculateReadTime(fullText + (formData.intro || ''));

    BlogService.publishPost({
      ...formData as FeaturedPost,
      author: 'Emine İrem Büyüksaraç',
      readTime
    });

    alert('Yazı başarıyla yayınlandı!');
    navigate('/admin/yazilar');
  };

  const updateSectionContent = (val: string) => {
    const sections = [{ heading: 'İçerik', content: val.split('\n\n') }];
    updateField('sections', sections);
    if (errors.content) setErrors(prev => ({ ...prev, content: '' }));
  };

  return {
    formData,
    errors,
    isPreviewOpen,
    saveStatus,
    setIsPreviewOpen,
    updateField,
    updateSectionContent,
    handleSaveDraft,
    handlePublish,
    isEdit: !!id
  };
};
