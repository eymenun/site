import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface NewsPageProps {
  onBack: () => void;
}

export function NewsPage({ onBack }: NewsPageProps) {
  const news = [
    {
      title: "Yeni Güncelleme: Polis Sistemi",
      date: "15 Mart 2024",
      content: "Polis sistemimiz tamamen yenilendi. Artık daha gerçekçi bir deneyim sunuyoruz.",
      image: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&q=80"
    },
    {
      title: "Yeni Araçlar Eklendi",
      date: "10 Mart 2024",
      content: "20'den fazla yeni araç sunucumuza eklendi. Tüm araçlar optimize edildi ve en iyi performansı sunuyor.",
      image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80"
    },
    {
      title: "Ekonomi Güncellemesi",
      date: "5 Mart 2024",
      content: "Ekonomi sistemi dengesi için yeni düzenlemeler yapıldı. Meslek gelirleri güncellendi.",
      image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={onBack}
          className="mb-8 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
          Geri Dön
        </button>

        <h1 className="text-4xl font-bold mb-12 text-center">Sunucu Haberleri</h1>

        <div className="grid gap-8">
          {news.map((item, index) => (
            <div key={index} className="bg-gray-800 rounded-lg overflow-hidden">
              <div className="h-64 relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
                <div className="absolute bottom-0 p-6">
                  <h2 className="text-2xl font-bold mb-2">{item.title}</h2>
                  <p className="text-gray-400">{item.date}</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-300">{item.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}