import React, { useState, useEffect } from "react";
import logo from "@/assets/logo.svg";

export function LogoLoader({ onFadeOut }: { onFadeOut: () => void }) {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFading(true);
      setTimeout(() => {
        setVisible(false);
        onFadeOut();
      }, 800);
    }, 1000);

    return () => clearTimeout(timer);
  }, [onFadeOut]);

  if (!visible) return null;

  return (
    <div className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background transition-opacity duration-700 ${fading ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
      <div className="relative flex flex-col items-center">
        {/* Modern Geometric Backdrop */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(255,180,0,0.08),transparent_70%)] blur-3xl" />
        
        <div className="relative group">
            {/* Spinning accent border */}
            <div className="absolute -inset-4 rounded-full border border-saffron/10 border-t-saffron/40 animate-[spin_4s_linear_infinite]" />
            <div className="absolute -inset-8 rounded-full border border-saffron/5 border-b-saffron/20 animate-[spin_6s_linear_infinite_reverse]" />
            
            <img 
                src={logo} 
                alt="NCB Logo" 
                className="relative z-10 size-32 md:size-40 drop-shadow-[0_0_20px_rgba(255,180,0,0.2)]" 
            />
        </div>
        
        <div className="mt-12 text-center space-y-3">
            <h1 className="text-white text-2xl md:text-3xl font-bold tracking-[0.2em] uppercase bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent">
                Narcotics Control Bureau
            </h1>
            <p className="text-saffron font-semibold tracking-[0.4em] uppercase text-xs md:text-sm">
                Government of India
            </p>
        </div>
      </div>

      <style>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
