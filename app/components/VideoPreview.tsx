"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

interface VideoPreviewProps {
  videoBlob: Blob;
  filename: string;
  originalUrl: string;
  onStartOver: () => void;
}

export default function VideoPreview({
  videoBlob,
  filename,
  originalUrl,
  onStartOver,
}: VideoPreviewProps) {
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const url = URL.createObjectURL(videoBlob);
    setVideoUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [videoBlob]);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = videoUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Video downloaded successfully!");
  };

  const handleShare = async () => {
    const shareData = {
      title: "Check out this AI-generated video",
      text: `Here’s a video ad I created using VideoHelp AI from ${originalUrl}`,
      files: [new File([videoBlob], filename, { type: "video/mp4" })],
    };

    if (navigator.canShare?.(shareData)) {
      try {
        await navigator.share(shareData);
        toast.success("Video shared successfully!");
      } catch (error) {
        console.error("Share error:", error);
        fallbackShare();
      }
    } else {
      fallbackShare();
    }
  };

  const fallbackShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  const copyLink = () => {
    navigator.clipboard.writeText(originalUrl);
    toast.success("Original URL copied to clipboard!");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h2 className="text-4xl font-bold text-white mb-4">
          Your Video is Ready
        </h2>
        <p className="text-white/80 text-lg">
          Here's your AI-generated video advertisement
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="glass-card p-6"
      >
        <div className="aspect-video bg-black/50 rounded-xl overflow-hidden relative group">
          {videoUrl && (
            <video
              className="w-full h-full object-cover"
              controls
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
            >
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}

          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors pointer-events-none">
              <span className="text-6xl">▶</span>
            </div>
          )}
        </div>

        <div className="mt-6 flex flex-wrap gap-4 justify-center">
          <motion.button
            onClick={handleDownload}
            className="glass-button flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Download Video</span>
          </motion.button>

          <motion.button
            onClick={onStartOver}
            className="glass-button flex items-center space-x-2 bg-white/10"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Start Over</span>
          </motion.button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="glass-card p-6"
      >
        <h3 className="text-xl font-semibold text-white mb-4">
          Generation Details
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-white/70">Original URL:</span>
            <div className="flex items-center space-x-2">
              <span className="text-white text-sm max-w-xs truncate">
                {originalUrl}
              </span>
              <button
                onClick={copyLink}
                className="p-1 hover:bg-white/20 rounded transition-colors"
              >
                <span>Copy</span>
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-white/70">File Size:</span>
            <span className="text-white">
              {(videoBlob.size / 1024 / 1024).toFixed(1)} MB
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-white/70">Format:</span>
            <span className="text-white">MP4</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-white/70">Generated:</span>
            <span className="text-white">{new Date().toLocaleString()}</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
