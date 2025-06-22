"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

interface URLInputProps {
  onSubmit: (url: string) => void;
}

export default function URLInput({ onSubmit }: URLInputProps) {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateURL = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!url.trim()) {
      toast.error("Please enter a URL");
      return;
    }

    if (!validateURL(url)) {
      toast.error("Please enter a valid URL");
      return;
    }

    setIsLoading(true);

    // Simulate validation delay
    setTimeout(() => {
      onSubmit(url);
      setIsLoading(false);
    }, 500);
  };

  const exampleUrls = [
    "https://www.amazon.in/dp/B0D1C2GS99",
    "https://www.shopify.com/example-product",
    "https://store.example.com/product/123",
  ];

  return (
    <div className="text-center space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="space-y-4"
      >
        <div className="flex items-center justify-center space-x-2 mb-6">
          <span className="text-4xl animate-pulse">✨</span>
          <h2 className="text-4xl md:text-6xl font-bold text-white">
            Transform URLs into
          </h2>
        </div>
        <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Stunning Video Ads
        </h2>
        <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
          Simply paste any product page URL and watch our AI create compelling
          video advertisements in seconds
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="glass-card p-8 max-w-2xl mx-auto"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="text-white/60">🔗</span>
            </div>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter product page URL (e.g., Amazon, Shopify, etc.)"
              className="glass-input w-full pl-12 pr-4 py-4 text-lg"
              disabled={isLoading}
            />
          </div>

          <motion.button
            type="submit"
            disabled={isLoading || !url.trim()}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-500 disabled:to-gray-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 group disabled:cursor-not-allowed"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Validating...</span>
              </>
            ) : (
              <>
                <span>Generate Video</span>
                <span className="group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </>
            )}
          </motion.button>
        </form>

        <div className="mt-6 pt-6 border-t border-white/20">
          <p className="text-sm text-white/60 mb-3">Try these example URLs:</p>
          <div className="flex flex-wrap gap-2">
            {exampleUrls.map((exampleUrl, index) => (
              <button
                key={index}
                onClick={() => setUrl(exampleUrl)}
                className="text-xs glass-button py-2 px-3 hover:bg-white/30"
              >
                {exampleUrl.replace("https://", "").substring(0, 25)}...
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
      >
        {[
          {
            icon: "🤖",
            title: "AI-Powered",
            desc: "Advanced AI analyzes your product page",
          },
          {
            icon: "⚡",
            title: "Lightning Fast",
            desc: "Generate videos in under 60 seconds",
          },
          {
            icon: "🎨",
            title: "Professional Quality",
            desc: "Studio-quality video advertisements",
          },
        ].map((feature, index) => (
          <div key={index} className="glass-card p-6 text-center">
            <div className="text-3xl mb-3">{feature.icon}</div>
            <h3 className="text-lg font-semibold text-white mb-2">
              {feature.title}
            </h3>
            <p className="text-sm text-white/70">{feature.desc}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
