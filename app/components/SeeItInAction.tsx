"use client";

import { motion } from "framer-motion";

export default function SeeItInAction() {
  const videos = [
    {
      id: 1,
      title: "Electronics Product Ad",
      description: "Generated from Amazon product page",
      thumbnail: "/videos/video1.mp4",
    },
    {
      id: 2,
      title: "Fashion Item Commercial",
      description: "Created from Shopify store URL",
      thumbnail: "/videos/video2.mp4",
    },
    {
      id: 3,
      title: "Home & Garden Promo",
      description: "Built from e-commerce listing",
      thumbnail: "/videos/video3.mp4",
    },
    {
      id: 4,
      title: "Tech Gadget Showcase",
      description: "Generated from product URL",
      thumbnail: "/videos/video4.mp4",
    },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            See It In Action
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Real videos generated from product URLs
          </p>
          <p className="text-lg text-white/60 mt-2">
            Watch how our AI transforms simple product pages into compelling
            video advertisements
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-card p-6"
            >
              <div className="aspect-video bg-black/50 rounded-xl overflow-hidden relative group mb-4">
                <video
                  className="w-full h-full object-cover"
                  controls
                  poster=""
                  preload="metadata"
                >
                  <source src={video.thumbnail} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors opacity-0 group-hover:opacity-100">
                  <span className="text-4xl">▶️</span>
                </div>
              </div>

              <div className="text-center">
                <h3 className="text-lg font-semibold text-white mb-2">
                  {video.title}
                </h3>
                <p className="text-white/70 text-sm">{video.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-12"
        >
          <div className="glass-card p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Create Your Own?
            </h3>
            <p className="text-white/80 mb-6">
              Join thousands of marketers who are already creating stunning
              video ads with VideoHelp AI
            </p>
            <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300">
              Get Started Free
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
