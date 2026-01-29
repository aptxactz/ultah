
import React, { useState } from 'react';
import { Camera, X, Heart, ZoomIn, Stars, Sparkles } from 'lucide-react';

interface Photo {
  id: number;
  url: string;
  caption: string;
}

/**
 * Endpoint ini biasanya paling stabil untuk menampilkan foto Google Drive di web.
 * Pastikan file di Drive disetting "Anyone with the link" (Siapa saja yang memiliki link).
 */
const getDriveUrl = (id: string) => `https://lh3.googleusercontent.com/d/${id}=w1000`;

const photos: Photo[] = [
  { id: 1, url: getDriveUrl('1rS4t7t8u3khV-VArY07WdSaBwJIWNzVw'), caption: 'Moment 1' },
  { id: 2, url: getDriveUrl('1Uq641xmUaciqa7RsMMQOxdlCNJ5vKuN-'), caption: 'Moment 2' },
  { id: 3, url: getDriveUrl('1tQLJOJcI1nTfIno8xiDQgXgMVclCu-1B'), caption: 'Moment 3' },
  { id: 4, url: getDriveUrl('1LrlyTxEXBUwunVT6hm8Z8oxzi-jP1BQo'), caption: 'Moment 4' },
  { id: 5, url: getDriveUrl('1y8_smfgYKSno38ziw_pIj7aRvYTLOmrz'), caption: 'Moment 5' },
  { id: 6, url: getDriveUrl('11XqGNLRII1PJ9u9LhLXBF8mKv6V_lq6q'), caption: 'Moment 6' },
  { id: 7, url: getDriveUrl('1Ud2Bkj9Q5UB0Cq9uVeG3NvcSsY8CIrwq'), caption: 'Moment 7' },
  { id: 8, url: getDriveUrl('1NB2gf2TcqrGmuAM-NS8NauWfm1zM2l5G'), caption: 'Moment 8' },
  { id: 9, url: getDriveUrl('1t9K6wJOrjEahlJhYooDZkJE3QZpgnEGg'), caption: 'Moment 9' },
  { id: 10, url: getDriveUrl('1kJvqCfOAVmg5aQHhZwcgRHSfUSmDnDxn'), caption: 'Moment 10' },
  { id: 11, url: getDriveUrl('12sr3SpbmZlfoO3RTz4KJyZJXxzuPX0w7'), caption: 'Moment 11' },
  { id: 12, url: getDriveUrl('1s61xdssJKaonqsHefpeicGJkiIVVbzgz'), caption: 'Moment 12' },
  { id: 13, url: getDriveUrl('1I4q_p4y23xm72BgAgihZopeF-DCNbVC1'), caption: 'Moment 13' },
  { id: 14, url: getDriveUrl('1YJVc661sJ-IzLwAtz0KGjPpFxuO4vxdZ'), caption: 'Moment 14' },
  { id: 15, url: getDriveUrl('1C9RIvihqUcRolQP-gyCxMrXlj25gxnrq'), caption: 'Moment 15' },
  { id: 16, url: getDriveUrl('14B48khTuq6j0rFGeK-E8AmyAQx8aaX-P'), caption: 'Moment 16' },
  { id: 17, url: getDriveUrl('1EF5fiiZaqq2B1df3usLdr22LTbcua4u'), caption: 'Moment 17' },
  { id: 18, url: getDriveUrl('1PJkKKtA5cmJrkZjViIH26uGDHaXq9jcf'), caption: 'Moment 18' },
];

export const GallerySection: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  return (
    <div className="min-h-screen bg-[#fffcfd] p-6 pb-32 overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-16 relative">
          <div className="inline-block p-4 bg-rose-100 rounded-full mb-6 shadow-sm">
            <Camera className="w-10 h-10 text-rose-500" />
          </div>
          <h2 className="text-5xl font-romantic text-rose-600 mb-4">Momen Indah Kita</h2>
          <p className="text-rose-400 font-medium max-w-md mx-auto italic">
            "Semua memori ini adalah alasan kenapa jarak gak akan pernah menang."
          </p>
          
          <div className="mt-6 flex flex-col items-center gap-2">
            <div className="flex justify-center gap-2">
               <span className="text-xs bg-rose-100 text-rose-500 px-3 py-1 rounded-full font-bold">Bandung 🇮🇩</span>
               <span className="text-xs bg-blue-100 text-blue-500 px-3 py-1 rounded-full font-bold">Japan 🇯🇵</span>
            </div>
          </div>
        </header>

        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {photos.map((photo) => (
            <div 
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className="break-inside-avoid group cursor-pointer bg-white p-2 shadow-lg border border-gray-100 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl rounded-sm"
            >
              <div className="relative overflow-hidden rounded-sm bg-rose-50 min-h-[150px] flex items-center justify-center">
                <img 
                  src={photo.url} 
                  alt="Special Memory" 
                  className="w-full h-auto transition-all duration-500 group-hover:scale-110"
                  loading="lazy"
                  crossOrigin="anonymous"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://via.placeholder.com/400x600?text=Klik+Untuk+Melihat+Foto";
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                   <div className="bg-white/90 p-2 rounded-full shadow-lg">
                      <ZoomIn className="text-rose-500 w-5 h-5" />
                   </div>
                </div>
              </div>
              <div className="mt-2 pb-1 text-center flex justify-center">
                 <Heart className="w-3 h-3 fill-rose-300 text-rose-300 opacity-50 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Preview */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-[fadeIn_0.3s_ease-out]">
          <button 
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors p-2"
          >
            <X className="w-10 h-10" />
          </button>
          
          <div className="max-w-4xl w-full flex flex-col items-center animate-[scaleIn_0.4s_cubic-bezier(0.175,0.885,0.32,1.275)]">
            <div className="bg-white p-2 rounded shadow-2xl relative w-full overflow-hidden">
              <img 
                src={selectedPhoto.url} 
                alt="Selected Memory" 
                className="w-full h-auto max-h-[85vh] object-contain rounded"
                crossOrigin="anonymous"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="mt-6 text-center text-white px-4">
              <p className="text-white/40 text-[10px] tracking-[0.4em] uppercase font-black">Memory captured with love</p>
            </div>
          </div>
        </div>
      )}

      <footer className="mt-20 text-center pb-12">
        <Sparkles className="w-8 h-8 text-yellow-400 mx-auto mb-4 animate-pulse" />
        <p className="text-rose-400 font-romantic text-4xl mb-2">Happy Birthday, Sayang!</p>
        <p className="text-gray-400 text-sm font-medium">I love you today, tomorrow, and always. 🤍</p>
      </footer>

      <style>{`
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
};
