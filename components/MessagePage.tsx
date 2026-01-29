
import React, { useEffect, useState } from 'react';
import { Heart, Stars, MapPin, Sparkles, ArrowRight } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

interface MessagePageProps {
  message: string;
  onNext: () => void;
}

export const MessagePage: React.FC<MessagePageProps> = ({ message, onNext }) => {
  const [aiWish, setAiWish] = useState<string>('');
  const [loadingAi, setLoadingAi] = useState(false);

  const generateSpecialWish = async () => {
    setLoadingAi(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: "Tuliskan satu ucapan ulang tahun romantis yang sangat puitis dan singkat dalam Bahasa Indonesia untuk pacar LDR yang sedang di Jepang. Gunakan kiasan tentang bintang atau musim dingin.",
        config: {
          systemInstruction: "Kamu adalah penyair romantis yang ahli membuat ucapan manis.",
          temperature: 0.8
        }
      });
      setAiWish(response.text || '');
    } catch (e) {
      console.error(e);
      setAiWish("Semoga bintang di langit Jepang selalu mengingatkanmu pada hangatnya pelukanku di Bandung.");
    } finally {
      setLoadingAi(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start py-12 px-6 md:px-12 bg-rose-50 overflow-y-auto">
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none opacity-10">
        <div className="absolute top-10 left-10"><Heart className="w-24 h-24 text-rose-500 fill-rose-500 rotate-12" /></div>
        <div className="absolute bottom-20 right-10"><Heart className="w-32 h-32 text-rose-500 fill-rose-500 -rotate-12" /></div>
        <div className="absolute top-1/2 left-5"><Stars className="w-16 h-16 text-rose-500" /></div>
      </div>

      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 md:p-12 relative z-10 border border-rose-100 mb-10">
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-rose-500 text-white px-6 py-2 rounded-full font-bold shadow-md flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          HBD Sayangku!
        </div>

        <div className="mt-4 flex justify-between items-center mb-10 border-b border-rose-100 pb-6">
          <div className="flex flex-col">
            <span className="text-xs text-rose-400 font-bold tracking-widest uppercase">From</span>
            <span className="text-lg font-serif-elegant font-bold text-gray-800">Bandung, ID</span>
          </div>
          <div className="flex-1 px-4 flex items-center justify-center relative">
            <div className="h-0.5 bg-rose-200 w-full relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2">
                <Heart className="w-5 h-5 text-rose-500 animate-pulse" />
              </div>
            </div>
          </div>
          <div className="flex flex-col text-right">
            <span className="text-xs text-rose-400 font-bold tracking-widest uppercase">To</span>
            <span className="text-lg font-serif-elegant font-bold text-gray-800">Japan, JP</span>
          </div>
        </div>

        <p className="text-2xl md:text-3xl font-serif-elegant leading-relaxed text-gray-800 text-center first-letter:text-5xl first-letter:font-romantic first-letter:text-rose-500 first-letter:mr-1">
          {message}
        </p>

        <div className="mt-12 pt-8 border-t border-rose-50 border-dashed text-center">
          <p className="font-romantic text-3xl text-rose-500 mb-2">I love you so much</p>
          <p className="font-bold text-gray-600 tracking-widest uppercase text-sm mb-6">Sayangmu dari Bandung</p>
          
          <button
            onClick={onNext}
            className="inline-flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white px-8 py-3 rounded-full font-bold shadow-lg transition-all group"
          >
            Lanjut Main Yuk <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Extra Interactive Element: Gemini Wish */}
      <div className="max-w-2xl w-full text-center space-y-6">
        <p className="text-rose-400 italic font-medium">Klik bintang di bawah untuk doa tambahan dari alam semesta...</p>
        <button 
          onClick={generateSpecialWish}
          disabled={loadingAi}
          className="bg-white/80 backdrop-blur-sm border-2 border-rose-300 p-4 rounded-full hover:bg-rose-100 transition-colors shadow-sm disabled:opacity-50"
        >
          {loadingAi ? (
            <div className="w-6 h-6 border-2 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <Stars className="w-6 h-6 text-rose-500" />
          )}
        </button>

        {aiWish && (
          <div className="bg-rose-100/50 backdrop-blur-sm p-6 rounded-2xl animate-[fadeIn_0.5s_ease-out] border border-rose-200">
            <p className="font-serif-elegant italic text-lg text-rose-800 leading-relaxed">
              "{aiWish}"
            </p>
          </div>
        )}
      </div>

      <footer className="mt-16 text-rose-300 text-xs flex items-center gap-2">
        <span>Made with</span>
        <Heart className="w-3 h-3 fill-rose-300" />
        <span>just for you</span>
      </footer>
    </div>
  );
};
