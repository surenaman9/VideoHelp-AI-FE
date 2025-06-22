'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Header from './components/Header'
import URLInput from './components/URLInput'
import VideoGenerator from './components/VideoGenerator'
import VideoPreview from './components/VideoPreview'
import SeeItInAction from './components/SeeItInAction'
import Footer from './components/Footer'
import BackgroundEffects from './components/BackgroundEffects'

export default function Home() {
  const [currentStep, setCurrentStep] = useState<'input' | 'generating' | 'preview'>('input')
  const [videoData, setVideoData] = useState<{
    url: string;
    blob?: Blob;
    filename?: string;
  } | null>(null)

  const handleURLSubmit = (url: string) => {
    setVideoData({ url })
    setCurrentStep('generating')
  }

  const handleVideoGenerated = (blob: Blob, filename: string) => {
    setVideoData(prev => prev ? { ...prev, blob, filename } : null)
    setCurrentStep('preview')
  }

  const handleGenerationError = () => {
    setCurrentStep('input')
    setVideoData(null)
  }

  const handleStartOver = () => {
    setCurrentStep('input')
    setVideoData(null)
  }

  return (
    <main className="min-h-screen gradient-bg relative overflow-hidden">
      <BackgroundEffects />
      
      <div className="relative z-10">
        <Header />
        
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            {currentStep === 'input' && (
              <URLInput onSubmit={handleURLSubmit} />
            )}
            
            {currentStep === 'generating' && videoData && (
              <VideoGenerator
                url={videoData.url}
                onVideoGenerated={handleVideoGenerated}
                onError={handleGenerationError}
              />
            )}
            
            {currentStep === 'preview' && videoData?.blob && (
              <VideoPreview
                videoBlob={videoData.blob}
                filename={videoData.filename || 'video.mp4'}
                originalUrl={videoData.url}
                onStartOver={handleStartOver}
              />
            )}
          </motion.div>
        </div>

        {currentStep === 'input' && <SeeItInAction />}
        
        <Footer />
      </div>
    </main>
  )
}