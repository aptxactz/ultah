
import React, { useState, useEffect } from 'react';
import { Lock, Heart, ShieldCheck, AlertCircle, Delete } from 'lucide-react';

interface PinSectionProps {
  onUnlock: () => void;
}

export const PinSection: React.FC<PinSectionProps> = ({ onUnlock }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const correctPin = '031225';

  const handleKeyPress = (num: string) => {
    if (isSuccess || error) return;
    if (pin.length < 6) {
      setPin(prev => prev + num);
    }
  };

  const handleDelete = () => {
    if (isSuccess || error) return;
    setPin(prev => prev.slice(0, -1));
  };

  useEffect(() => {
    if (pin === correctPin) {
      setIsSuccess(true);
      setTimeout(() => {
        onUnlock();
      }, 1000);
    } else if (pin.length === 6 && pin !== correctPin) {
      setError(true);
      setTimeout(() => {
        setPin('');
        setError(false);
      }, 1000);
    }
  }, [pin, onUnlock]);

  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'back', '0'];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fffcfd] p-4 relative">
      {/* Decorative background hearts */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <Heart className="absolute top-10 left-10 w-20 h-20 text-rose-200" />
        <Heart className="absolute bottom-20 right-10 w-32 h-32 text-rose-300" />
      </div>

      <div className="max-w-xs w-full bg-white rounded-[2rem] shadow-2xl p-6 border border-rose-100 relative z-10 flex flex-col items-center text-center">
        <div className={`p-3 rounded-full mb-4 transition-colors duration-500 ${isSuccess ? 'bg-green-100' : 'bg-rose-100'}`}>
          {isSuccess ? (
            <ShieldCheck className="w-8 h-8 text-green-500 animate-bounce" />
          ) : (
            <Lock className="w-8 h-8 text-rose-500" />
          )}
        </div>

        <h2 className="text-xl font-romantic text-rose-600 mb-1">Area Rahasia</h2>
        <p className="text-gray-400 text-[10px] mb-6 font-medium px-4">
          "Masukkan tanggal spesial kita."
        </p>

        {/* PIN Display Boxes - Slightly smaller */}
        <div className="flex gap-1.5 mb-8">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`w-7 h-10 rounded-lg border flex items-center justify-center text-xl font-bold transition-all duration-300 
                ${pin.length > i ? 'border-rose-400 bg-rose-50 text-rose-600' : 'border-rose-100 bg-gray-50 text-gray-300'}
                ${error ? 'border-red-400 bg-red-50 animate-shake' : ''}
                ${isSuccess ? 'border-green-500 bg-green-50 scale-110' : ''}
              `}
            >
              {pin[i] ? '•' : ''}
            </div>
          ))}
        </div>

        {error && (
          <div className="flex items-center gap-1.5 text-red-500 text-[10px] font-bold mb-4 animate-pulse">
            <AlertCircle className="w-3 h-3" />
            Tanggal salah nih, sayang...
          </div>
        )}

        {/* Custom Keypad Grid - Reduced size and gaps */}
        <div className="grid grid-cols-3 gap-2.5 w-full max-w-[200px]">
          {keys.map((key, index) => {
            if (key === 'back') {
              return (
                <button
                  key="back"
                  onClick={handleDelete}
                  className="w-full aspect-square flex items-center justify-center rounded-xl bg-rose-50 text-rose-400 hover:bg-rose-100 active:scale-90 transition-all shadow-sm"
                >
                  <Delete className="w-5 h-5" />
                </button>
              );
            }
            return (
              <button
                key={key}
                onClick={() => handleKeyPress(key)}
                className={`w-full aspect-square flex items-center justify-center rounded-xl text-lg font-bold transition-all shadow-sm
                  ${key === '0' && index === 10 ? 'col-start-2' : ''}
                  bg-white border border-rose-50 text-rose-600 hover:bg-rose-50 active:scale-90 active:bg-rose-500 active:text-white
                `}
              >
                {key}
              </button>
            );
          })}
        </div>

        <p className="mt-6 text-rose-200 text-[9px] tracking-widest uppercase font-black">
          Hint: DDMMYY
        </p>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-6px); }
          75% { transform: translateX(6px); }
        }
        .animate-shake {
          animation: shake 0.2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};
