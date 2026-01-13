
export interface UserData {
  name: string;
  role: string;
  specialties: string[];
  city: string;
  email: string;
  linkedin: string;
  github: string;
  bio: string;
}

export interface Post {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
}
