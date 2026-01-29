
import React, { useState, useEffect, useCallback } from 'react';
import { Heart, Trophy, Sparkles, Music, Brain, Star, CheckCircle2, ArrowRight } from 'lucide-react';

interface GameSectionProps {
  onComplete: () => void;
}

enum GameLevel {
  CATCH = 1,
  RHYTHM = 2,
  MEMORY = 3,
  CONSTELLATION = 4,
  FINISHED = 5
}

interface StarPoint {
  id: number;
  x: number;
  y: number;
}

export const GameSection: React.FC<GameSectionProps> = ({ onComplete }) => {
  const [level, setLevel] = useState<GameLevel>(GameLevel.CATCH);
  const [score, setScore] = useState(0);
  
  const [gameHearts, setGameHearts] = useState<{ id: number; left: number; top: number; size: number }[]>([]);
  const [pulseScale, setPulseScale] = useState(1);
  const [rhythmHits, setRhythmHits] = useState(0);
  const [memoryCards, setMemoryCards] = useState<{ id: number; icon: string; flipped: boolean; matched: boolean }[]>([]);
  const [flippedIds, setFlippedIds] = useState<number[]>([]);
  const [activeStar, setActiveStar] = useState(0);

  const constellationPoints: StarPoint[] = [
    { id: 0, x: 15, y: 75 },
    { id: 1, x: 30, y: 55 },
    { id: 2, x: 50, y: 40 },
    { id: 3, x: 70, y: 55 },
    { id: 4, x: 85, y: 25 },
  ];

  const spawnHeart = useCallback(() => {
    if (level !== GameLevel.CATCH) return;
    const id = Math.random();
    const newHeart = {
      id,
      left: 10 + Math.random() * 80,
      top: 10 + Math.random() * 70,
      size: 30 + Math.random() * 30
    };
    setGameHearts(prev => [...prev, newHeart]);
    setTimeout(() => {
      setGameHearts(prev => prev.filter(h => h.id !== id));
    }, 1500);
  }, [level]);

  useEffect(() => {
    if (level === GameLevel.CATCH) {
      const interval = setInterval(spawnHeart, 800);
      return () => clearInterval(interval);
    }
  }, [level, spawnHeart]);

  const handleHeartClick = (id: number) => {
    setScore(s => {
      const newScore = s + 1;
      if (newScore >= 10) {
        setTimeout(() => {
          setLevel(GameLevel.RHYTHM);
          setScore(0);
        }, 500);
      }
      return newScore;
    });
    setGameHearts(prev => prev.filter(h => h.id !== id));
  };

  useEffect(() => {
    if (level === GameLevel.RHYTHM) {
      const interval = setInterval(() => {
        setPulseScale(s => (s >= 1.5 ? 0.8 : s + 0.1));
      }, 100);
      return () => clearInterval(interval);
    }
  }, [level]);

  const handleRhythmClick = () => {
    if (pulseScale >= 1.3) {
      setRhythmHits(h => {
        const newHits = h + 1;
        if (newHits >= 5) {
          setTimeout(() => {
            initMemoryGame();
            setLevel(GameLevel.MEMORY);
          }, 500);
        }
        return newHits;
      });
    }
  };

  const initMemoryGame = () => {
    const icons = ['🌸', '🍣', '🏔️', '🍜', '🍱', '⛩️']; 
    const deck = [...icons, ...icons]
      .sort(() => Math.random() - 0.5)
      .map((icon, idx) => ({ id: idx, icon, flipped: false, matched: false }));
    setMemoryCards(deck);
  };

  const handleCardClick = (id: number) => {
    if (flippedIds.length === 2 || memoryCards[id].flipped || memoryCards[id].matched) return;
    const newFlipped = [...flippedIds, id];
    setFlippedIds(newFlipped);
    
    setMemoryCards(prev => {
      const updated = prev.map(c => c.id === id ? { ...c, flipped: true } : c);
      if (newFlipped.length === 2) {
        const [firstId, secondId] = newFlipped;
        if (updated[firstId].icon === updated[secondId].icon) {
          const nextCards = updated.map(c => (c.id === firstId || c.id === secondId) ? { ...c, matched: true, flipped: true } : c);
          if (nextCards.every(c => c.matched)) {
            setTimeout(() => setLevel(GameLevel.CONSTELLATION), 1000);
          }
          setFlippedIds([]);
          return nextCards;
        } else {
          setTimeout(() => {
            setMemoryCards(current => current.map(c => (c.id === firstId || c.id === secondId) ? { ...c, flipped: false } : c));
            setFlippedIds([]);
          }, 1000);
        }
      }
      return updated;
    });
  };

  const handleStarClick = (id: number) => {
    if (id === activeStar) {
      setActiveStar(prev => {
        const next = prev + 1;
        if (next >= constellationPoints.length) {
          setTimeout(() => setLevel(GameLevel.FINISHED), 1000);
        }
        return next;
      });
    }
  };

  const renderLevel = () => {
    switch (level) {
      case GameLevel.CATCH:
        return (
          <div className="relative w-full h-full flex flex-col items-center">
            <div className="text-center mb-4">
              <h3 className="text-2xl font-romantic text-rose-600">Level 1: Tangkap Cinta</h3>
              <p className="text-sm text-gray-500">Cintaku lagi beterbangan, tangkap 10 ya!</p>
              <div className="mt-2 text-rose-500 font-bold">{score}/10</div>
            </div>
            <div className="relative w-full h-64 bg-rose-50/50 rounded-2xl overflow-hidden border border-rose-100">
              {gameHearts.map(h => (
                <button
                  key={h.id}
                  onClick={() => handleHeartClick(h.id)}
                  style={{ left: `${h.left}%`, top: `${h.top}%`, fontSize: `${h.size}px` }}
                  className="absolute animate-bounce transform -translate-x-1/2 -translate-y-1/2"
                >
                  ❤️
                </button>
              ))}
            </div>
          </div>
        );
      case GameLevel.RHYTHM:
        return (
          <div className="relative w-full h-full flex flex-col items-center justify-center">
            <div className="text-center mb-8">
              <Music className="w-8 h-8 text-rose-500 mx-auto mb-2" />
              <h3 className="text-2xl font-romantic text-rose-600">Level 2: Detak Jantung</h3>
              <p className="text-sm text-gray-500">Klik saat hatinya paling besar!</p>
              <div className="mt-2 text-rose-500 font-bold">Sinkronisasi: {rhythmHits}/5</div>
            </div>
            <button onClick={handleRhythmClick} style={{ transform: `scale(${pulseScale})` }} className="text-6xl transition-transform duration-100">💓</button>
          </div>
        );
      case GameLevel.MEMORY:
        return (
          <div className="relative w-full h-full flex flex-col items-center">
            <div className="text-center mb-6"><Brain className="w-8 h-8 text-rose-500 mx-auto mb-2" /><h3 className="text-2xl font-romantic text-rose-600">Level 3: Ingatan Manis</h3></div>
            <div className="grid grid-cols-4 gap-3">
              {memoryCards.map(card => (
                <button key={card.id} onClick={() => handleCardClick(card.id)} className={`w-14 h-14 rounded-xl text-2xl flex items-center justify-center transition-all duration-300 shadow-md ${card.flipped || card.matched ? 'bg-white rotate-0' : 'bg-rose-400 rotate-180'}`}>
                  {(card.flipped || card.matched) ? card.icon : '❓'}
                </button>
              ))}
            </div>
          </div>
        );
      case GameLevel.CONSTELLATION:
        return (
          <div className="relative w-full h-full flex flex-col items-center">
            <div className="text-center mb-4"><Star className="w-8 h-8 text-yellow-400 mx-auto mb-2 animate-pulse" /><h3 className="text-2xl font-romantic text-rose-600">Level 4: Konstelasi Rindu</h3></div>
            <div className="relative w-full h-72 bg-[#0a0e27] rounded-3xl overflow-hidden border-2 border-indigo-900 shadow-inner">
               <svg className="absolute inset-0 w-full h-full pointer-events-none">
                 {constellationPoints.map((point, i) => {
                   if (i === 0) return null;
                   const prev = constellationPoints[i-1];
                   const isActive = activeStar >= i;
                   return <line key={`line-${i}`} x1={`${prev.x}%`} y1={`${prev.y}%`} x2={`${point.x}%`} y2={`${point.y}%`} stroke={isActive ? "#fb7185" : "rgba(99, 102, 241, 0.2)"} strokeWidth={isActive ? "3" : "1"} className="transition-all duration-1000" />;
                 })}
               </svg>
               {constellationPoints.map((point) => (
                 <button key={point.id} onClick={() => handleStarClick(point.id)} style={{ left: `${point.x}%`, top: `${point.y}%` }} className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${activeStar === point.id ? 'scale-125 z-20' : 'scale-100 z-10'}`}>
                   <div className={`p-2 rounded-full ${activeStar > point.id ? 'bg-rose-500' : activeStar === point.id ? 'bg-yellow-400' : 'bg-indigo-900/50'}`}>
                      <Star className={`w-5 h-5 ${activeStar >= point.id ? 'text-white' : 'text-indigo-400'}`} />
                   </div>
                 </button>
               ))}
            </div>
          </div>
        );
      case GameLevel.FINISHED:
        return (
          <div className="absolute inset-0 bg-white flex flex-col items-center justify-center text-rose-600 p-8 rounded-3xl z-50">
            <Trophy className="w-20 h-20 mb-6 animate-bounce text-yellow-400" />
            <h3 className="text-4xl font-romantic mb-4 text-center">Permainan Selesai!</h3>
            <p className="text-center mb-10 text-lg text-gray-600">Kamu hebat banget, sayang! Sekarang ada kejutan spesial buat kamu...</p>
            <button onClick={onComplete} className="bg-rose-500 text-white px-10 py-4 rounded-full font-bold shadow-2xl flex items-center gap-3 hover:scale-105 transition-transform">Lanjut <ArrowRight className="w-6 h-6" /></button>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fffcfd] p-6 relative overflow-hidden">
      <div className="w-full max-w-md mb-12 flex justify-between items-center px-4 relative">
        <div className="absolute top-1/2 left-4 right-4 h-1 bg-rose-100 -translate-y-1/2 -z-10"></div>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${level >= i ? 'bg-rose-500 border-rose-500 text-white' : 'bg-white border-rose-200 text-rose-200'}`}>
            {level > i ? <CheckCircle2 className="w-6 h-6" /> : i}
          </div>
        ))}
      </div>
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl p-8 border border-rose-100 relative min-h-[500px] flex items-center justify-center">
        {renderLevel()}
      </div>
    </div>
  );
};
