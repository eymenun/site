import React, { useState, useEffect } from 'react';
import { Users, GamepadIcon, Server, Copy, Settings, Newspaper } from 'lucide-react';
import { useAuth } from './contexts/AuthContext';
import { LoginModal } from './components/LoginModal';
import { AdminPanel } from './components/AdminPanel';
import { NewsPage } from './components/NewsPage';

interface Feature {
  title: string;
  description: string;
}

interface StoredData {
  serverIP: string;
  serverName: string;
  description: string;
  backgrounds: string[];
  features: Feature[];
}

function App() {
  const { isAuthenticated } = useAuth();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [showNews, setShowNews] = useState(false);
  
  // Load initial state from localStorage or use defaults
  const loadStoredData = (): StoredData => {
    const stored = localStorage.getItem('siteData');
    if (stored) {
      return JSON.parse(stored);
    }
    return {
      serverIP: "connect cfx.re/join/abc123",
      serverName: "Sunucu Adı",
      description: "FiveM'in en iyi roleplay deneyimi",
      backgrounds: [
        "https://images.unsplash.com/photo-1606206522398-de3bd05b1615?auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1547149617-609fafa00a6b?auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1547149666-769eb84ae0ee?auto=format&fit=crop&q=80"
      ],
      features: [
        {
          title: "Özel Meslekler ve Ekonomi",
          description: "Sunucumuzun özel içerikleri ve özellikleri ile benzersiz bir roleplay deneyimi yaşayın"
        },
        {
          title: "Aktif Yetkili Ekibi",
          description: "7/24 aktif yetkili ekibimiz ile sorunlarınıza anında çözüm bulun"
        },
        {
          title: "Düzenli Güncellemeler",
          description: "Her hafta yeni içerikler ve güncellemeler ile oyun deneyiminizi taze tutun"
        },
        {
          title: "Özel Araçlar",
          description: "Özel tasarlanmış araçlar ile şehirde tarzınızı yansıtın"
        },
        {
          title: "Aktif Topluluk",
          description: "Büyük ve aktif topluluğumuz ile eğlenceli vakit geçirin"
        },
        {
          title: "7/24 Destek",
          description: "Discord üzerinden 7/24 destek alın"
        }
      ]
    };
  };

  const initialData = loadStoredData();
  
  const [serverIP, setServerIP] = useState(initialData.serverIP);
  const [serverName, setServerName] = useState(initialData.serverName);
  const [description, setDescription] = useState(initialData.description);
  const [backgrounds, setBackgrounds] = useState(initialData.backgrounds);
  const [features, setFeatures] = useState<Feature[]>(initialData.features);

  // Save to localStorage whenever data changes
  useEffect(() => {
    const dataToStore: StoredData = {
      serverIP,
      serverName,
      description,
      backgrounds,
      features
    };
    localStorage.setItem('siteData', JSON.stringify(dataToStore));
  }, [serverIP, serverName, description, backgrounds, features]);

  const [currentBg, setCurrentBg] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgrounds.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [backgrounds.length]);
  
  const handleCopyIP = () => {
    navigator.clipboard.writeText(serverIP);
  };

  const handleConnect = () => {
    window.location.href = `fivem://connect/${serverIP}`;
  };

  if (showNews) {
    return <NewsPage onBack={() => setShowNews(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      {/* Hero Section */}
      <div 
        className="h-screen bg-cover bg-center relative transition-all duration-1000"
        style={{
          backgroundImage: `url("${backgrounds[currentBg]}")`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60">
          <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center">
            <h1 className="text-6xl font-bold mb-4 text-center">{serverName}</h1>
            <p className="text-xl mb-8 text-gray-300 text-center">{description}</p>
            
            <div className="flex gap-4">
              <button
                onClick={handleConnect}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg flex items-center gap-2 transition-all"
              >
                <GamepadIcon size={20} />
                Sunucuya Bağlan
              </button>
              
              <button
                onClick={handleCopyIP}
                className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded-lg flex items-center gap-2 transition-all"
              >
                <Copy size={20} />
                IP Kopyala
              </button>

              <button
                onClick={() => setShowNews(true)}
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg flex items-center gap-2 transition-all"
              >
                <Newspaper size={20} />
                Haberler
              </button>

              {isAuthenticated ? (
                <button
                  onClick={() => setIsAdminPanelOpen(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg flex items-center gap-2 transition-all"
                >
                  <Settings size={20} />
                  Admin Paneli
                </button>
              ) : (
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded-lg flex items-center gap-2 transition-all"
                >
                  <Settings size={20} />
                  Giriş Yap
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Sunucu Özellikleri</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-all">
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 py-8">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>© 2024 {serverName}. Tüm hakları saklıdır.</p>
        </div>
      </footer>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />

      <AdminPanel
        isOpen={isAdminPanelOpen}
        onClose={() => setIsAdminPanelOpen(false)}
        backgrounds={backgrounds}
        setBackgrounds={setBackgrounds}
        serverName={serverName}
        setServerName={setServerName}
        description={description}
        setDescription={setDescription}
        features={features}
        setFeatures={setFeatures}
        serverIP={serverIP}
        setServerIP={setServerIP}
      />
    </div>
  );
}

export default App;