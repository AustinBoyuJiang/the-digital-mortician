'use client';

import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

const photos = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=600&h=400&fit=crop',
    title: 'Cipher_2024_birthday.jpg',
    date: '2024-03-15',
    description: 'First day I brought Cipher home!',
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1558788353-f76d92427f16?w=600&h=400&fit=crop',
    title: 'best_boy.jpg',
    date: '2024-05-20',
    description: 'Cipher at the park. Such a good boy.',
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&h=400&fit=crop',
    title: 'lazy_sunday.jpg',
    date: '2024-06-10',
    description: 'Weekend vibes with my buddy.',
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&h=400&fit=crop',
    title: 'cipher_office.jpg',
    date: '2024-07-01',
    description: 'Brought him to the OmniCorp office for pet day.',
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1544568100-847a948585b9?w=600&h=400&fit=crop',
    title: 'family_1989.jpg',
    date: '1989-08-12',
    description: 'Maya and me in the backyard. Best summer ever.',
  },
  {
    id: 6,
    url: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=600&h=400&fit=crop',
    title: 'birthday_2024.jpg',
    date: '2024-11-15',
    description: 'My 35th birthday. Cipher wore a party hat!',
  },
];

export default function PhotosApp() {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  const handlePrevious = () => {
    if (selectedPhoto === null) return;
    const currentIndex = photos.findIndex((p) => p.id === selectedPhoto);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : photos.length - 1;
    setSelectedPhoto(photos[prevIndex].id);
  };

  const handleNext = () => {
    if (selectedPhoto === null) return;
    const currentIndex = photos.findIndex((p) => p.id === selectedPhoto);
    const nextIndex = currentIndex < photos.length - 1 ? currentIndex + 1 : 0;
    setSelectedPhoto(photos[nextIndex].id);
  };

  return (
    <div className="h-full bg-zinc-950 relative">
      {selectedPhoto === null ? (
        <div className="p-4 grid grid-cols-3 gap-3 overflow-y-auto h-full">
          {photos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhoto(photo.id)}
              className="relative aspect-square bg-zinc-800 rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-cyan-500 transition-all group"
            >
              <img
                src={photo.url}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                <div className="text-xs font-mono text-white truncate">
                  {photo.title}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="h-full flex flex-col bg-black">
          <div className="flex items-center justify-between p-3 border-b border-zinc-800">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="text-zinc-400 hover:text-white transition-colors flex items-center gap-2"
            >
              <X size={18} />
              <span className="text-sm font-mono">Close</span>
            </button>
            <div className="flex gap-2">
              <button
                onClick={handlePrevious}
                className="text-zinc-400 hover:text-cyan-400 transition-colors p-1"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={handleNext}
                className="text-zinc-400 hover:text-cyan-400 transition-colors p-1"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center p-4 overflow-hidden">
            <img
              src={photos.find((p) => p.id === selectedPhoto)?.url}
              alt={photos.find((p) => p.id === selectedPhoto)?.title}
              className="max-w-full max-h-full object-contain"
            />
          </div>

          <div className="p-4 border-t border-zinc-800">
            <div className="text-sm font-mono text-cyan-400 mb-1">
              {photos.find((p) => p.id === selectedPhoto)?.title}
            </div>
            <div className="text-xs font-mono text-zinc-500 mb-2">
              {photos.find((p) => p.id === selectedPhoto)?.date}
            </div>
            <div className="text-sm font-mono text-zinc-300">
              {photos.find((p) => p.id === selectedPhoto)?.description}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
