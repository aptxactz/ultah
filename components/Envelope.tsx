
import React from 'react';
import { Heart, MailOpen } from 'lucide-react';

interface EnvelopeProps {
  onOpen: () => void;
  title: string;
}

export const Envelope: React.FC<EnvelopeProps> = ({ onOpen, title }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl md:text-5xl font-romantic text-rose-600 mb-12 text-center drop-shadow-sm">
        {title}
      </h1>
      
      <div className="relative group cursor-pointer transition-transform duration-500 hover:scale-105" onClick={onOpen}>
        {/* Envelope Base */}
        <div className="w-72 h-48 md:w-96 md:h-64 bg-rose-100 rounded-lg shadow-2xl relative border-2 border-rose-200 overflow-hidden">
          {/* Envelope Flap Shadow */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-0 left-0 w-0 h-0 border-l-[144px] md:border-l-[192px] border-l-transparent border-r-[144px] md:border-r-[192px] border-r-transparent border-t-[100px] md:border-t-[140px] border-t-rose-200 opacity-50"></div>
          </div>
          
          {/* Decorative Stamps */}
          <div className="absolute top-4 right-4 w-12 h-16 bg-white border-2 border-dashed border-rose-300 rounded flex items-center justify-center rotate-6">
            <Heart className="text-rose-400 fill-rose-400 w-6 h-6" />
          </div>

          <div className="absolute bottom-4 left-4 font-romantic text-rose-400 text-lg opacity-60">
            With Love
          </div>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white p-3 rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Heart className="text-rose-500 fill-rose-500 w-8 h-8 animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={onOpen}
        className="mt-12 px-8 py-4 bg-rose-500 hover:bg-rose-600 text-white rounded-full font-bold shadow-lg transition-all transform hover:-translate-y-1 active:scale-95 flex items-center gap-2 group"
      >
        <MailOpen className="w-5 h-5 group-hover:rotate-12 transition-transform" />
        Buka Pesan
      </button>

      <div className="mt-8 text-rose-400 text-sm font-medium flex gap-4">
        <span>Bandung 🇮🇩</span>
        <span className="animate-bounce">✈️</span>
        <span>Japan 🇯🇵</span>
      </div>
    </div>
  );
};
