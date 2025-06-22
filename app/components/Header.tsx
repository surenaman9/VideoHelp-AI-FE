"use client";

import { motion } from "framer-motion";

export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative z-20 py-6"
    >
      <div className="container mx-auto px-4">
        <div className="glass-card p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                <div className="w-6 h-6 bg-white rounded-sm"></div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">VideoHelp AI</h1>
                <p className="text-sm text-white/60">URL to Video Magic</p>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-2 text-white/80">
              <span className="text-2xl">✨</span>
              <span className="text-sm">Powered by AI</span>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
