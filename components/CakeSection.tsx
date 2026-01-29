
import React, { useState, useEffect } from 'react';
import { Sparkles, Wand2, ArrowRight } from 'lucide-react';

interface CakeSectionProps {
  onComplete: () => void;
}

export const CakeSection: React.FC<CakeSectionProps> = ({ onComplete }) => {
  const [isWishing, setIsWishing] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [litCandles, setLitCandles] = useState<boolean[]>([true, true, true, true]);
  const [showConfetti, setShowConfetti] = useState(false);

  const startWishing = () => {
    setIsWishing(true);
    setCountdown(3);
  };

  useEffect(() => {
    if (countdown !== null && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setCountdown(null);
    }
  }, [countdown]);

  const blowCandle = (index: number) => {
    if (countdown !== null || !isWishing) return;
    setLitCandles(prev => {
      const next = [...prev];
      next[index] = false;
      if (next.every(c => !c)) {
        setShowConfetti(true);
      }
      return next;
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fffcfd] p-6 relative overflow-hidden">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-10 border border-rose-100 flex flex-col items-center relative min-h-[600px]">
        <div className="text-center mb-8">
          <Sparkles className="w-10 h-10 text-rose-500 mx-auto mb-2 animate-pulse" />
          <h3 className="text-4xl font-romantic text-rose-600">Halaman 4: Make a Wish</h3>
          <p className="text-gray-500 italic">"Satu doa dari hatimu, untuk kita berdua."</p>
        </div>

        <div className="relative w-full flex-1 flex flex-col items-center justify-center">
          {showConfetti && (
            <div className="absolute inset-0 z-50 pointer-events-none overflow-hidden">
               {[...Array(60)].map((_, i) => (
                 <div key={i} className={`absolute w-3 h-3 rounded-full animate-ping`} style={{
                   left: `${Math.random() * 100}%`,
                   top: `${Math.random() * 100}%`,
                   backgroundColor: ['#fb7185', '#fbbf24', '#60a5fa', '#f472b6', '#34d399'][Math.floor(Math.random() * 5)],
                   animationDelay: `${Math.random() * 2}s`
                 }} />
               ))}
               <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/40 backdrop-blur-[2px] rounded-3xl">
                  <div className="text-5xl font-romantic text-rose-600 animate-bounce text-center px-4">YAY! SELAMAT ULANG TAHUN SAYANG! 🎂✨</div>
                  <button onClick={onComplete} className="mt-12 bg-rose-500 text-white px-10 py-4 rounded-full font-bold shadow-xl flex items-center gap-3 hover:scale-105 transition-transform pointer-events-auto">
                    Lihat Galeri Foto <ArrowRight className="w-6 h-6" />
                  </button>
               </div>
            </div>
          )}

          {countdown !== null && (
            <div className="absolute inset-0 z-40 flex items-center justify-center bg-white/40 backdrop-blur-sm rounded-3xl">
              <div className="text-[12rem] font-romantic text-rose-500 animate-[pulse_1s_infinite]">{countdown}</div>
            </div>
          )}

          <div className="relative w-full h-64 flex flex-col items-center justify-end pb-8">
            <div className="flex gap-8 mb-[-15px] z-10 relative">
              {litCandles.map((isLit, idx) => (
                <div key={idx} className="relative flex flex-col items-center">
                  {isLit && (
                    <button onClick={() => blowCandle(idx)} className={`absolute -top-10 w-8 h-10 bg-yellow-400 rounded-full blur-[2px] animate-pulse transition-opacity duration-500 ${countdown !== null ? 'opacity-50 cursor-default' : 'opacity-100 cursor-pointer hover:scale-125'}`}>
                       <div className="absolute top-1 left-1/2 -translate-x-1/2 w-3 h-5 bg-orange-500 rounded-full"></div>
                    </button>
                  )}
                  <div className="w-4 h-16 bg-rose-200 border-x-2 border-rose-300 rounded-t-md"></div>
                </div>
              ))}
            </div>
            <div className="w-80 h-32 bg-rose-100 rounded-t-[50px] border-x-8 border-t-8 border-rose-200 relative shadow-inner">
               <div className="absolute top-0 left-0 w-full h-8 bg-white/50 rounded-t-[50px] border-b-2 border-rose-300"></div>
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-rose-400 font-romantic text-3xl">Happy Birthday 🤍</div>
               </div>
            </div>
            <div className="w-96 h-6 bg-rose-300 rounded-full shadow-2xl"></div>
          </div>

          {!isWishing ? (
            <button onClick={startWishing} className="mt-8 bg-rose-500 text-white px-12 py-5 rounded-full font-bold shadow-2xl flex items-center gap-3 hover:scale-110 transition-transform text-xl">
              <Wand2 className="w-6 h-6" /> Make a Wish
            </button>
          ) : countdown === null && litCandles.some(c => c) ? (
            <div className="mt-8 text-rose-500 font-bold animate-bounce italic text-2xl text-center">
              Tap semua api di atas lilin untuk memadamkannya! 🌬️
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
