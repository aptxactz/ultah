
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Envelope } from './components/Envelope';
import { MessagePage } from './components/MessagePage';
import { GameSection } from './components/GameSection';
import { CakeSection } from './components/CakeSection';
import { GallerySection } from './components/GallerySection';
import { PinSection } from './components/PinSection';
import { AppState } from './types';
import { Music, Music2, Volume2, VolumeX } from 'lucide-react';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.PIN);
  const [hearts, setHearts] = useState<{ id: number; left: number; duration: number; size: number }[]>([]);
  const [isMuted, setIsMuted] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const title = "Untuk Kekasihku Tersayang";
  const messageText = "Selamat ulang tahun, sayangku 🤍 walaupun jarak lagi jahat sama kita, rasa sayang aku ke kamu nggak pernah berkurang sedikit pun. Makasih ya udah jadi rumah buat hati aku, walau lewat layar. Semoga di umur baru ini kamu selalu sehat, bahagia, dan ngerasa dicintai—terutama sama aku. I love you today, tomorrow, and always.";

  const musicUrl = "https://audio.jukehost.co.uk/Di0jCWkn8nxRSxSAP9WavYDTsYiRYWiw"; 

  const handleOpen = () => {
    setAppState(AppState.OPENING);
    
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error("Playback failed:", error);
          setAudioError(true);
        });
      }
    }

    setTimeout(() => {
      setAppState(AppState.MESSAGE);
    }, 1000);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const spawnHeart = useCallback(() => {
    const id = Date.now();
    const newHeart = {
      id,
      left: Math.random() * 100,
      duration: 3 + Math.random() * 4,
      size: 10 + Math.random() * 20
    };
    setHearts(prev => [...prev, newHeart]);
    setTimeout(() => {
      setHearts(prev => prev.filter(h => h.id !== id));
    }, newHeart.duration * 1000);
  }, []);

  useEffect(() => {
    if (appState !== AppState.PIN && appState !== AppState.CLOSED && appState !== AppState.OPENING) {
      const interval = setInterval(spawnHeart, 1000);
      return () => clearInterval(interval);
    }
  }, [appState, spawnHeart]);

  const renderContent = () => {
    switch (appState) {
      case AppState.PIN:
        return <PinSection onUnlock={() => setAppState(AppState.CLOSED)} />;
      case AppState.CLOSED:
      case AppState.OPENING:
        return (
          <div className={`transition-all duration-1000 ${appState === AppState.OPENING ? 'opacity-0 scale-150 blur-lg' : 'opacity-100'}`}>
            <Envelope onOpen={handleOpen} title={title} />
          </div>
        );
      case AppState.MESSAGE:
        return (
          <div className="animate-[fadeIn_1s_ease-out]">
            <MessagePage message={messageText} onNext={() => setAppState(AppState.GAME)} />
          </div>
        );
      case AppState.GAME:
        return (
          <div className="animate-[fadeIn_1s_ease-out]">
            <GameSection onComplete={() => setAppState(AppState.CAKE)} />
          </div>
        );
      case AppState.CAKE:
        return (
          <div className="animate-[fadeIn_1s_ease-out]">
            <CakeSection onComplete={() => setAppState(AppState.GALLERY)} />
          </div>
        );
      case AppState.GALLERY:
        return (
          <div className="animate-[fadeIn_1s_ease-out]">
            <GallerySection />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#fffcfd]">
      <audio 
        ref={audioRef} 
        loop 
        preload="auto"
        crossOrigin="anonymous"
      >
        <source src={musicUrl} type="audio/mpeg" />
      </audio>

      {appState !== AppState.PIN && appState !== AppState.CLOSED && appState !== AppState.OPENING && (
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-2">
          {audioError && !isMuted && (
            <div className="bg-rose-100 text-rose-600 text-[10px] px-3 py-1 rounded-full border border-rose-200 animate-pulse">
              Musik diblokir browser, klik tombol di bawah
            </div>
          )}
          <button
            onClick={toggleMute}
            className="bg-rose-500/80 backdrop-blur-md text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all group border-2 border-white/50"
          >
            {isMuted ? (
              <VolumeX className="w-6 h-6" />
            ) : (
              <div className="relative">
                <Volume2 className="w-6 h-6" />
                <Music2 className="absolute -top-2 -right-2 w-4 h-4 animate-bounce text-yellow-200" />
              </div>
            )}
          </button>
        </div>
      )}

      {hearts.map(heart => (
        <div
          key={heart.id}
          className="absolute pointer-events-none text-rose-400 opacity-60 animate-[floatUp_linear_infinite]"
          style={{
            left: `${heart.left}%`,
            bottom: '-50px',
            animationDuration: `${heart.duration}s`,
            fontSize: `${heart.size}px`
          }}
        >
          ❤️
        </div>
      ))}

      <main className="relative z-10">
        {renderContent()}
      </main>

      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(0) rotate(0); opacity: 0; }
          20% { opacity: 0.6; }
          100% { transform: translateY(-120vh) rotate(360deg); opacity: 0; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default App;
