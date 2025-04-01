import React, { useState } from 'react';
import { X, Save, Plus } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface Feature {
  title: string;
  description: string;
}

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  backgrounds: string[];
  setBackgrounds: (urls: string[]) => void;
  serverName: string;
  setServerName: (name: string) => void;
  description: string;
  setDescription: (desc: string) => void;
  features: Feature[];
  setFeatures: (features: Feature[]) => void;
  serverIP: string;
  setServerIP: (ip: string) => void;
}

export function AdminPanel({
  isOpen,
  onClose,
  backgrounds,
  setBackgrounds,
  serverName,
  setServerName,
  description,
  setDescription,
  features,
  setFeatures,
  serverIP,
  setServerIP
}: AdminPanelProps) {
  const { logout } = useAuth();
  const [tempBackgrounds, setTempBackgrounds] = useState(backgrounds.join('\n'));
  const [tempServerName, setTempServerName] = useState(serverName);
  const [tempDescription, setTempDescription] = useState(description);
  const [tempFeatures, setTempFeatures] = useState<Feature[]>(features);
  const [tempServerIP, setTempServerIP] = useState(serverIP);

  if (!isOpen) return null;

  const handleSave = () => {
    setBackgrounds(tempBackgrounds.split('\n').filter(url => url.trim()));
    setServerName(tempServerName);
    setDescription(tempDescription);
    setFeatures(tempFeatures);
    setServerIP(tempServerIP);
    onClose();
  };

  const handleFeatureChange = (index: number, field: 'title' | 'description', value: string) => {
    const newFeatures = [...tempFeatures];
    newFeatures[index] = {
      ...newFeatures[index],
      [field]: value
    };
    setTempFeatures(newFeatures);
  };

  const handleAddFeature = () => {
    setTempFeatures([
      ...tempFeatures,
      {
        title: 'Yeni Özellik',
        description: 'Özellik açıklaması'
      }
    ]);
  };

  const handleRemoveFeature = (index: number) => {
    setTempFeatures(tempFeatures.filter((_, i) => i !== index));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-8 rounded-lg w-[800px] max-h-[90vh] overflow-y-auto relative">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Admin Paneli</h2>
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-green-700"
            >
              <Save size={20} />
              Kaydet
            </button>
            <button
              onClick={() => {
                logout();
                onClose();
              }}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Çıkış Yap
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-gray-300 mb-2">Sunucu IP</label>
            <input
              type="text"
              value={tempServerIP}
              onChange={(e) => setTempServerIP(e.target.value)}
              className="w-full bg-gray-700 text-white rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Sunucu Adı</label>
            <input
              type="text"
              value={tempServerName}
              onChange={(e) => setTempServerName(e.target.value)}
              className="w-full bg-gray-700 text-white rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Açıklama</label>
            <input
              type="text"
              value={tempDescription}
              onChange={(e) => setTempDescription(e.target.value)}
              className="w-full bg-gray-700 text-white rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Arkaplan Fotoğrafları (Her satıra bir URL)</label>
            <textarea
              value={tempBackgrounds}
              onChange={(e) => setTempBackgrounds(e.target.value)}
              className="w-full bg-gray-700 text-white rounded px-4 py-2 h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <label className="block text-gray-300">Özellikler</label>
              <button
                onClick={handleAddFeature}
                className="bg-blue-600 text-white px-3 py-1 rounded flex items-center gap-2 hover:bg-blue-700"
              >
                <Plus size={16} />
                Yeni Özellik Ekle
              </button>
            </div>
            <div className="space-y-4">
              {tempFeatures.map((feature, index) => (
                <div key={index} className="bg-gray-700 p-4 rounded">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300">#{index + 1}</span>
                    <button
                      onClick={() => handleRemoveFeature(index)}
                      className="text-red-500 hover:text-red-400"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  <div className="mb-2">
                    <label className="block text-gray-300 mb-1">Başlık</label>
                    <input
                      type="text"
                      value={feature.title}
                      onChange={(e) => handleFeatureChange(index, 'title', e.target.value)}
                      className="w-full bg-gray-600 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-1">Açıklama</label>
                    <input
                      type="text"
                      value={feature.description}
                      onChange={(e) => handleFeatureChange(index, 'description', e.target.value)}
                      className="w-full bg-gray-600 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}