import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Sparkles, 
  Heart, 
  Music, 
  ChevronDown,
  Flower2,
  CheckCircle2,
  Wind,
  Loader2,
  Cake,
  PartyPopper,
  Gift
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

// Celebration Constants
const PARTY_DATE = new Date('2026-03-06T16:00:00'); // This Friday at 4 PM
const NAMES = ["Tahyra", "Amelia"];

// Image Generation Prompt - Updated for more "Birthday Party" feel
const IMAGE_PROMPT = "A vibrant and cute 20th birthday garden party scene. Indie aesthetic, film photography style. A colorful table with a bright pink birthday cake, fun birthday hats, streamers hanging from trees, mismatched chairs in shades of pink, purple and blue, friends laughing (candid), sun flares. No wedding vibes, no white tablecloths, no formal flowers. Fun, messy, and full of life.";

export default function App() {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [hasRSVPed, setHasRSVPed] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGeneratingImage, setIsGeneratingImage] = useState(true);

  const ai = useMemo(() => new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' }), []);

  useEffect(() => {
    async function generateThemeImage() {
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: {
            parts: [{ text: IMAGE_PROMPT }],
          },
        });

        for (const part of response.candidates?.[0]?.content?.parts || []) {
          if (part.inlineData) {
            setGeneratedImage(`data:image/png;base64,${part.inlineData.data}`);
            break;
          }
        }
      } catch (error) {
        console.error("Failed to generate image:", error);
        setGeneratedImage("https://images.unsplash.com/photo-1464349153735-7db50ed83c84?auto=format&fit=crop&w=1000&q=80");
      } finally {
        setIsGeneratingImage(false);
      }
    }

    generateThemeImage();
  }, [ai]);

  function calculateTimeLeft() {
    const difference = +PARTY_DATE - +new Date();
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }
    return timeLeft;
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleRSVP = () => {
    setHasRSVPed(true);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 8000);
  };

  return (
    <div className="min-h-screen font-sans selection:bg-birthday-pink/30">
      {/* Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden birthday-pattern" />
      <div className="fixed inset-0 -z-20 bg-birthday-cream" />
      
      {/* Floating Shapes */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-[10%] left-[10%] w-24 h-24 bg-birthday-pink/20 rounded-full blur-2xl" 
        />
        <motion.div 
          animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute bottom-[20%] right-[15%] w-32 h-32 bg-birthday-purple/20 rounded-full blur-2xl" 
        />
      </div>

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden">
        {/* Large Background Milestone */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.08, scale: 1 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        >
          <span className="text-[30rem] md:text-[50rem] font-serif font-black leading-none text-birthday-pink">20</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="z-10"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <PartyPopper className="text-birthday-pink" size={20} />
            <span className="text-sm font-bold tracking-[0.2em] uppercase text-birthday-pink">
              Birthday Bash!
            </span>
            <PartyPopper className="text-birthday-pink" size={20} />
          </div>
          
          <h1 className="text-6xl md:text-9xl font-serif font-black leading-tight mb-4 text-stone-800 drop-shadow-sm">
            {NAMES[0]} <span className="text-birthday-purple">&</span> {NAMES[1]}
          </h1>
          
          <div className="flex flex-col items-center gap-4 mb-12">
            <div className="bg-birthday-blue/30 border-2 border-birthday-blue px-6 py-2 rotate-[-2deg] shadow-md">
              <h2 className="text-2xl md:text-4xl font-serif italic text-stone-800 font-black">
                Turning 20!
              </h2>
            </div>
            <p className="text-lg md:text-xl font-medium text-stone-600 max-w-xl mx-auto leading-relaxed">
              We're leaving our teens behind! Come celebrate a fun afternoon in the garden.
            </p>
          </div>
        </motion.div>

        {/* Countdown */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="grid grid-cols-4 gap-3 md:gap-6 mb-16"
        >
          {Object.entries(timeLeft).map(([label, value]) => (
            <div key={label} className="flex flex-col items-center">
              <div className="glass w-14 h-14 md:w-20 md:h-20 flex items-center justify-center rounded-2xl mb-2 bg-white/80">
                <span className="text-xl md:text-3xl font-bold text-birthday-pink font-mono">{value.toString().padStart(2, '0')}</span>
              </div>
              <span className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">{label}</span>
            </div>
          ))}
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-12"
        >
          <ChevronDown className="text-birthday-pink" size={32} />
        </motion.div>
      </section>

      {/* Details Section */}
      <section className="py-32 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-birthday-blue/10 text-birthday-blue text-xs font-bold uppercase tracking-widest border-2 border-birthday-blue/20">
                <Cake size={14} /> The Party Plan
              </div>
              <h2 className="text-4xl md:text-6xl font-serif font-black text-stone-800">Where & When</h2>
              <p className="text-xl text-birthday-purple font-bold italic">"Casual pero cu ambiente"</p>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center gap-6 p-6 glass rounded-3xl hover:translate-x-2 transition-transform">
                <div className="p-4 rounded-2xl bg-birthday-pink/20 text-birthday-pink">
                  <Calendar size={28} />
                </div>
                <div>
                  <h3 className="font-black text-stone-800 text-xl uppercase tracking-tight">Friday, March 6</h3>
                  <p className="text-stone-500 font-medium">Party starts at 4:00 PM</p>
                </div>
              </div>

              <div className="flex items-center gap-6 p-6 glass rounded-3xl hover:translate-x-2 transition-transform">
                <div className="p-4 rounded-2xl bg-birthday-blue/20 text-birthday-blue">
                  <MapPin size={28} />
                </div>
                <div>
                  <h3 className="font-black text-stone-800 text-xl uppercase tracking-tight">vaartsche rijn</h3>
                  <p className="text-stone-500 font-medium">Flamingostraat 123</p>
                </div>
              </div>

              <div className="flex items-center gap-6 p-6 glass rounded-3xl hover:translate-x-2 transition-transform">
                <div className="p-4 rounded-2xl bg-birthday-purple/20 text-birthday-purple">
                  <Music size={28} />
                </div>
                <div>
                  <h3 className="font-black text-stone-800 text-xl uppercase tracking-tight">The Vibe</h3>
                  <p className="text-stone-500 font-medium">Garden Fun • Good Music • 20th Vibes</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, rotate: 5 }}
            whileInView={{ opacity: 1, rotate: -2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="sticker-border bg-white p-4 shadow-2xl">
              <div className="aspect-[4/5] overflow-hidden bg-stone-100 flex items-center justify-center">
                {isGeneratingImage ? (
                  <div className="flex flex-col items-center gap-3 text-stone-400">
                    <Loader2 className="animate-spin" size={32} />
                    <p className="text-sm font-bold italic">Baking the cake...</p>
                  </div>
                ) : generatedImage ? (
                  <img 
                    src={generatedImage} 
                    alt="Birthday Vibe" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : null}
              </div>
              <div className="pt-4 pb-2 text-center">
                <p className="font-serif italic text-xl text-stone-600">Double the fun, double the 20!</p>
              </div>
            </div>
            
            {/* Decorative Stickers */}
            <motion.div 
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-8 -right-8 w-20 h-20 bg-birthday-blue rounded-full flex items-center justify-center shadow-lg rotate-12 border-4 border-white"
            >
              <span className="font-black text-2xl text-white">20!</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* RSVP Section */}
      <section className="py-32 px-6 relative overflow-hidden bg-birthday-pink/5">
        <div className="max-w-2xl mx-auto text-center relative z-10">
          <motion.div 
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-birthday-pink text-white mb-8 shadow-xl"
          >
            <Gift size={32} />
          </motion.div>
          
          <h2 className="text-5xl md:text-7xl font-serif font-black text-stone-800 mb-6">Coming?</h2>
          <p className="text-xl text-stone-600 font-medium mb-12 max-w-md mx-auto leading-relaxed">
            We can't wait to party with you! Let us know if you're making it to the garden.
          </p>

          <AnimatePresence mode="wait">
            {!hasRSVPed ? (
              <motion.button
                key="rsvp-btn"
                whileHover={{ scale: 1.05, rotate: 2 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleRSVP}
                className="px-12 py-5 bg-birthday-pink text-white font-black text-xl rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] hover:shadow-none transition-all"
              >
                HELL YEAH!
              </motion.button>
            ) : (
              <motion.div
                key="rsvp-success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-4"
              >
                <div className="w-20 h-20 rounded-full bg-birthday-blue text-white flex items-center justify-center shadow-lg">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="text-3xl font-serif font-black text-stone-800">You're in!</h3>
                <p className="text-stone-500 font-bold">Get ready for the best afternoon ever.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 text-center">
        <p className="text-stone-400 text-sm font-black uppercase tracking-[0.3em]">
          Tahyra & Amelia • The Big 20 • 2026
        </p>
      </footer>

      {/* Confetti Overlay */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(60)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                top: -20, 
                left: `${Math.random() * 100}%`,
                rotate: 0,
                scale: Math.random() * 0.6 + 0.4,
                opacity: 0
              }}
              animate={{ 
                top: '110%',
                rotate: 720,
                left: `${Math.random() * 100}%`,
                opacity: [0, 1, 1, 0]
              }}
              transition={{ 
                duration: Math.random() * 3 + 2,
                ease: "easeOut",
                repeat: 0
              }}
              className="absolute"
            >
              <div 
                className="w-4 h-4 rounded-sm"
                style={{ 
                  backgroundColor: ['#ff85a2', '#c77dff', '#a2d2ff', '#ff4d6d'][Math.floor(Math.random() * 4)],
                  transform: `rotate(${Math.random() * 360}deg)`
                }}
              />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
