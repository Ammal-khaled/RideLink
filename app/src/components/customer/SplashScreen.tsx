import React from 'react';
import { Car } from 'lucide-react';

export function SplashScreen() {
  return (
    <div className="h-screen bg-primary flex flex-col items-center justify-center text-white">
      <div className="mb-8 animate-pulse">
        <div className="w-24 h-24 rounded-3xl bg-white/20 flex items-center justify-center mb-4">
          <Car className="w-12 h-12 text-white" />
        </div>
      </div>
      
      <h1 className="text-4xl font-bold mb-2">RideLink</h1>
      <p className="text-lg text-white/80">Your Journey, Our Cars</p>
      
      <div className="mt-12">
        <div className="flex space-x-1">
          <div className="w-3 h-3 rounded-full bg-white/60 animate-bounce"></div>
          <div className="w-3 h-3 rounded-full bg-white/60 animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-3 h-3 rounded-full bg-white/60 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
}