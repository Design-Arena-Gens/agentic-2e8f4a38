"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [scene, setScene] = useState(1);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setAudioContext(new (window.AudioContext || (window as any).webkitAudioContext)());
    }
  }, []);

  const startExperience = () => {
    setIsPlaying(true);

    // Scene progression
    setTimeout(() => setScene(2), 8000);  // Move to scene 2 after 8s
    setTimeout(() => setScene(3), 16000); // Move to scene 3 after 16s
  };

  const playTone = (frequency: number, duration: number, type: OscillatorType = 'sine') => {
    if (!audioContext) return;

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = type;

    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
  };

  useEffect(() => {
    if (!isPlaying) return;

    // Scene 1 ambient sounds
    if (scene === 1) {
      const interval = setInterval(() => {
        playTone(200 + Math.random() * 100, 0.3, 'triangle');
      }, 2000);
      return () => clearInterval(interval);
    }

    // Scene 2 hopeful tone
    if (scene === 2) {
      playTone(440, 0.5);
      setTimeout(() => playTone(554, 0.5), 500);
    }

    // Scene 3 uplifting tones
    if (scene === 3) {
      playTone(523, 0.3);
      setTimeout(() => playTone(659, 0.3), 300);
      setTimeout(() => playTone(784, 0.5), 600);
    }
  }, [scene, isPlaying, audioContext]);

  return (
    <main className="min-h-screen flex items-center justify-center overflow-hidden relative">
      {/* Intro Overlay */}
      <AnimatePresence>
        {!isPlaying && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-black"
          >
            <button
              onClick={startExperience}
              className="px-8 py-4 bg-rove-purple text-white text-xl font-bold rounded-lg hover:bg-rove-dark transition-all hover:scale-105 glow-purple"
            >
              ▶ Start Experience
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene 1: Tired Riders at Chai Stall */}
      <AnimatePresence>
        {scene === 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="w-full h-screen flex items-center justify-center relative"
          >
            {/* Background elements */}
            <div className="absolute inset-0 bg-gradient-to-b from-yellow-600/20 to-orange-800/30" />

            {/* Chai stall setup */}
            <div className="relative z-10 grid grid-cols-2 gap-8 max-w-6xl px-8">
              {/* Rider 1 */}
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col items-center"
              >
                <div className="w-32 h-32 bg-red-500 rounded-full flex items-center justify-center mb-4 border-4 border-red-700">
                  <span className="text-white text-5xl font-bold">Z</span>
                </div>
                <div className="bg-white/90 px-6 py-3 rounded-lg shadow-lg">
                  <p className="text-gray-800 font-medium italic text-center">
                    "Yaar, poora hafta nikal gaya..."
                  </p>
                </div>
              </motion.div>

              {/* Rider 2 */}
              <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="flex flex-col items-center"
              >
                <div className="w-32 h-32 bg-blue-500 rounded-full flex items-center justify-center mb-4 border-4 border-blue-700">
                  <span className="text-white text-5xl font-bold">S</span>
                </div>
                <div className="bg-white/90 px-6 py-3 rounded-lg shadow-lg">
                  <p className="text-gray-800 font-medium italic text-center">
                    "Kuch kamaai hi nahi..."
                  </p>
                </div>
              </motion.div>

              {/* Rider 3 */}
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="flex flex-col items-center"
              >
                <div className="w-32 h-32 bg-green-500 rounded-full flex items-center justify-center mb-4 border-4 border-green-700">
                  <span className="text-white text-5xl font-bold">U</span>
                </div>
                <div className="bg-white/90 px-6 py-3 rounded-lg shadow-lg">
                  <p className="text-gray-800 font-medium italic text-center">
                    "Sab commission mein chala jaata hai."
                  </p>
                </div>
              </motion.div>

              {/* Rider 4 */}
              <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.1 }}
                className="flex flex-col items-center"
              >
                <div className="w-32 h-32 bg-yellow-500 rounded-full flex items-center justify-center mb-4 border-4 border-yellow-700">
                  <span className="text-white text-5xl font-bold">D</span>
                </div>
                <div className="bg-white/90 px-6 py-3 rounded-lg shadow-lg">
                  <p className="text-gray-800 font-medium italic text-center">
                    😞
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Ambient elements */}
            <motion.div
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute bottom-10 left-10 text-gray-600 text-sm"
            >
              🚗 *distant traffic*
            </motion.div>
            <motion.div
              animate={{ opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
              className="absolute top-20 right-20 text-gray-600 text-sm"
            >
              ☕ *chai cups clinking*
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene 2: ROVE Rider Appears */}
      <AnimatePresence>
        {scene === 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="w-full h-screen flex items-center justify-center relative"
          >
            {/* Brighter background */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-200 via-orange-200 to-purple-200" />

            {/* ROVE Rider entrance */}
            <motion.div
              initial={{ x: -200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="relative z-10 flex flex-col items-center"
            >
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(107, 70, 193, 0.3)",
                    "0 0 40px rgba(107, 70, 193, 0.6)",
                    "0 0 20px rgba(107, 70, 193, 0.3)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-48 h-48 bg-rove-purple rounded-full flex items-center justify-center mb-6 border-8 border-rove-dark relative"
              >
                <span className="text-white text-7xl font-bold">R</span>
                <div className="absolute -top-3 -right-3 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center">
                  <span className="text-3xl">✨</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, type: "spring" }}
                className="bg-rove-purple text-white px-8 py-4 rounded-xl font-bold text-3xl shadow-2xl mb-8"
              >
                ROVE
              </motion.div>

              {/* Parcel with logo */}
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-32 h-32 bg-amber-700 rounded-lg flex items-center justify-center shadow-xl relative border-4 border-amber-900"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">ROVE</span>
                </div>
                <motion.div
                  animate={{ rotate: [0, 5, 0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-2 -right-2 text-3xl"
                >
                  📦
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Observers' reactions */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="absolute bottom-20 left-20 bg-white/90 px-6 py-3 rounded-lg shadow-lg"
            >
              <p className="text-gray-700 italic">"Koi nayi company hai kya?"</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="absolute bottom-20 right-20 bg-white/90 px-6 py-3 rounded-lg shadow-lg"
            >
              <p className="text-gray-700 italic">"Lagta hai mast kama raha hai..."</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene 3: Curiosity and Close-up */}
      <AnimatePresence>
        {scene === 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="w-full h-screen flex items-center justify-center relative"
          >
            {/* Golden hour lighting */}
            <div className="absolute inset-0 bg-gradient-to-t from-orange-400 via-yellow-300 to-amber-200" />

            <div className="relative z-10 flex flex-col items-center max-w-4xl">
              {/* Curious riders approach */}
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1 }}
                className="flex gap-8 mb-12"
              >
                <div className="w-24 h-24 bg-red-500 rounded-full flex items-center justify-center border-4 border-red-700">
                  <span className="text-white text-4xl">Z</span>
                </div>
                <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center border-4 border-blue-700">
                  <span className="text-white text-4xl">S</span>
                </div>
              </motion.div>

              {/* Question */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="bg-white px-8 py-4 rounded-xl shadow-2xl mb-12"
              >
                <p className="text-2xl font-medium text-gray-800">"Bhai... yeh kya hai?"</p>
              </motion.div>

              {/* Parcel close-up with dramatic lighting */}
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="relative"
              >
                <motion.div
                  animate={{
                    boxShadow: [
                      "0 0 30px rgba(251, 191, 36, 0.5)",
                      "0 0 60px rgba(251, 191, 36, 0.8)",
                      "0 0 30px rgba(251, 191, 36, 0.5)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-64 h-64 bg-amber-700 rounded-2xl flex flex-col items-center justify-center shadow-2xl border-8 border-amber-900"
                >
                  <div className="text-white font-bold text-5xl mb-4">ROVE</div>
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="text-6xl"
                  >
                    📦
                  </motion.div>
                </motion.div>

                {/* Sunlight rays effect */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.3, 0.7, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 bg-gradient-to-br from-yellow-300/40 to-transparent rounded-2xl"
                />
              </motion.div>

              {/* ROVE Rider's confident smile */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="mt-12 flex flex-col items-center"
              >
                <div className="w-32 h-32 bg-rove-purple rounded-full flex items-center justify-center mb-4 border-6 border-rove-dark glow-purple">
                  <span className="text-white text-5xl">😊</span>
                </div>
                <div className="bg-rove-purple text-white px-6 py-2 rounded-lg font-medium">
                  Confident. Calm. ROVE.
                </div>
              </motion.div>
            </div>

            {/* Motivational text overlay */}
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2 }}
              className="absolute top-20 text-center"
            >
              <h1 className="text-6xl font-bold text-rove-dark text-shadow-soft">
                The New Way
              </h1>
              <p className="text-2xl text-gray-700 mt-2">Delivering Hope. Delivering ROVE.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
