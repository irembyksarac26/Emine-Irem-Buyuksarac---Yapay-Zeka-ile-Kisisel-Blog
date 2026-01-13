
import { UserData, Post } from '../types';

export const USER_INFO: UserData = {
  name: "Emine İrem Büyüksaraç",
  role: "Junior Yazılımcı",
  specialties: ["HTML", "Bilgi Güvenliği", "Python", "Yapay Zeka"],
  city: "Eskişehir",
  email: "buyuksaracirem650@gmail.com",
  linkedin: "https://www.linkedin.com/in/irembuyuksarac/",
  github: "https://github.com/irembyksarac26",
  bio: "Bilgi Güvenliği ve Yönetim Bilişim Sistemleri mezunu olarak, güçlü bir teknik altyapıya ve analitik düşünme becerisine sahibim. Çeşitli programlama dillerindeki yetkinliğimi, temel muhasebe bilgimle birleştirerek iş süreçlerine bütünsel bir bakış açısı sunuyorum. Öğrenmeye açık, disiplinli ve çözüm odaklı bir profesyonel olarak, bilgi teknolojileri alanında değer katabileceğim bir kariyer hedefliyorum."
};

export const MOCK_POSTS: Post[] = [
  {
    id: 1,
    title: "Bilgi Güvenliğinde İlk Adımlar",
    excerpt: "Modern dünyada dijital varlıklarımızı korumak neden her zamankinden daha önemli?",
    date: "15 Haz 2024",
    readTime: "5 dk okuma"
  },
  {
    id: 2,
    title: "Python ile Veri Analizi",
    excerpt: "Junior bir yazılımcı gözünden Python kütüphaneleri ve temel veri işleme teknikleri.",
    date: "22 Haz 2024",
    readTime: "8 dk okuma"
  },
  {
    id: 3,
    title: "Yönetim Bilişim Sistemleri ve Kariyer",
    excerpt: "İş dünyası ile teknolojinin kesişim noktasında bir kariyer inşa etmek.",
    date: "01 Tem 2024",
    readTime: "6 dk okuma"
  }
];
