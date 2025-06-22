"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative z-20 py-8 mt-16"
    >
      <div className="container mx-auto px-4">
        <div className="glass-card p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                  <div className="w-6 h-6 bg-white rounded-sm"></div>
                </div>
                <h3 className="text-xl font-bold text-white">VideoHelp AI</h3>
              </div>
              <p className="text-white/70 mb-4 max-w-md">
                Transform any product page URL into stunning video
                advertisements with the power of AI. Create professional
                marketing videos in seconds.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-white/60 hover:text-white transition-colors"
                >
                  Privacy
                </a>
                <a
                  href="#"
                  className="text-white/60 hover:text-white transition-colors"
                >
                  Terms
                </a>
                <a
                  href="#"
                  className="text-white/60 hover:text-white transition-colors"
                >
                  Support
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    API
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    Integrations
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/60 text-sm">
              © 2025 VideoHelp AI. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="#"
                className="text-white/60 hover:text-white transition-colors"
              >
                <span className="sr-only">Twitter</span>
                <div className="w-5 h-5 bg-white/60 rounded"></div>
              </a>
              <a
                href="#"
                className="text-white/60 hover:text-white transition-colors"
              >
                <span className="sr-only">LinkedIn</span>
                <div className="w-5 h-5 bg-white/60 rounded"></div>
              </a>
              <a
                href="#"
                className="text-white/60 hover:text-white transition-colors"
              >
                <span className="sr-only">GitHub</span>
                <div className="w-5 h-5 bg-white/60 rounded"></div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
