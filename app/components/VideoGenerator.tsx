'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import toast from 'react-hot-toast'

interface VideoGeneratorProps {
  url: string
  onVideoGenerated: (blob: Blob, filename: string) => void
  onError: () => void
}

export default function VideoGenerator({ url, onVideoGenerated, onError }: VideoGeneratorProps) {
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState('Analyzing product page...')
  const [isGenerating, setIsGenerating] = useState(true)

  const steps = [
    'Analyzing product page...',
    'Extracting product information...',
    'Generating compelling script...',
    'Creating visual elements...',
    'Rendering video advertisement...',
    'Finalizing your video...'
  ]

  useEffect(() => {
    generateVideo()
  }, [])

  const generateVideo = async () => {
    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + Math.random() * 15
          if (newProgress >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return newProgress
        })
      }, 1000)

      // Update status messages
      const statusInterval = setInterval(() => {
        setStatus(prev => {
          const currentIndex = steps.indexOf(prev)
          if (currentIndex < steps.length - 1) {
            return steps[currentIndex + 1]
          }
          clearInterval(statusInterval)
          return prev
        })
      }, 3000)

      // Make API call to generate video
      const response = await axios.post('/api/generate-video', 
        { url },
        {
          responseType: 'blob',
          timeout: 120000, // 2 minutes timeout
          onDownloadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
              setProgress(Math.max(90, percentCompleted))
            }
          }
        }
      )

      clearInterval(progressInterval)
      clearInterval(statusInterval)

      setProgress(100)
      setStatus('Video generated successfully!')
      setIsGenerating(false)

      // Extract filename from response headers or generate one
      const contentDisposition = response.headers['content-disposition']
      let filename = 'generated-video.mp4'
      
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="?([^"]+)"?/)
        if (filenameMatch) {
          filename = filenameMatch[1]
        }
      }

      // Create blob from response
      const videoBlob = new Blob([response.data], { type: 'video/mp4' })
      
      setTimeout(() => {
        onVideoGenerated(videoBlob, filename)
      }, 1500)

    } catch (error: any) {
      console.error('Video generation error:', error)
      setIsGenerating(false)
      
      let errorMessage = 'Failed to generate video. Please try again.'
      
      if (error.response?.status === 500) {
        errorMessage = 'Server error while processing your request. Please try a different URL.'
      } else if (error.code === 'ECONNABORTED') {
        errorMessage = 'Request timed out. The URL might be taking too long to process.'
      } else if (error.response?.data) {
        errorMessage = `Error: ${error.response.data.detail || error.response.data.message || 'Unknown error'}`
      }
      
      toast.error(errorMessage)
      onError()
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="glass-card p-8 text-center"
      >
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Creating Your Video</h2>
          <p className="text-white/70">
            Our AI is analyzing <span className="text-purple-300 font-medium">{url}</span>
          </p>
        </div>

        <div className="space-y-6">
          {/* Progress Circle */}
          <div className="relative w-32 h-32 mx-auto">
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="50"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="8"
                fill="none"
              />
              <motion.circle
                cx="60"
                cy="60"
                r="50"
                stroke="url(#gradient)"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={314}
                initial={{ strokeDashoffset: 314 }}
                animate={{ strokeDashoffset: 314 - (314 * progress) / 100 }}
                transition={{ duration: 0.5 }}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#EC4899" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              {isGenerating ? (
                <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : progress === 100 ? (
                <span className="text-2xl">✅</span>
              ) : (
                <span className="text-2xl">❌</span>
              )}
            </div>
          </div>

          {/* Progress Text */}
          <div>
            <div className="text-2xl font-bold text-white mb-2">
              {Math.round(progress)}%
            </div>
            <motion.p
              key={status}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-white/80"
            >
              {status}
            </motion.p>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          {/* Estimated Time */}
          {isGenerating && (
            <p className="text-sm text-white/60">
              Estimated time: {Math.max(1, Math.ceil((100 - progress) / 20))} minutes remaining
            </p>
          )}
        </div>
      </motion.div>
    </div>
  )
}