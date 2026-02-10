"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { FaHeart, FaMusic, FaCamera, FaCalendar, FaEnvelope, FaLock, FaUnlock } from "react-icons/fa"

export default function ModernLoveWebsite() {
  const [currentSection, setCurrentSection] = useState(0)
  const [isLocked, setIsLocked] = useState(true)
  const [password, setPassword] = useState("")
  const [selectedMemory, setSelectedMemory] = useState<number | null>(null)
  const [likedReasons, setLikedReasons] = useState<number[]>([])
  const [playingMusic, setPlayingMusic] = useState(false)
  const [showTimeline, setShowTimeline] = useState(false)

  const correctPassword = "iloveyou" // You can customize this

  const sections = [
    { id: 0, name: "Welcome", icon: FaHeart },
    { id: 1, name: "Our Story", icon: FaCalendar },
    { id: 2, name: "Memories", icon: FaCamera },
    { id: 3, name: "Why You", icon: FaEnvelope },
    { id: 4, name: "Our Song", icon: FaMusic },
  ]

  const memories = [
    {
      title: "First Date",
      date: "January 2024",
      image: "/api/placeholder/400/300",
      description: "The day everything changed"
    },
    {
      title: "Beach Trip",
      date: "March 2024",
      image: "/api/placeholder/400/300",
      description: "Sun, sand, and us"
    },
    {
      title: "Cozy Night",
      date: "May 2024",
      image: "/api/placeholder/400/300",
      description: "Movies and cuddles"
    },
    {
      title: "Adventure",
      date: "July 2024",
      image: "/api/placeholder/400/300",
      description: "Exploring together"
    },
  ]

  const reasons = [
    { text: "Your laugh brightens my darkest days", emoji: "😊" },
    { text: "You understand me like no one else", emoji: "🤝" },
    { text: "Every moment with you feels right", emoji: "✨" },
    { text: "You make me want to be better", emoji: "🌟" },
    { text: "Your smile is my favorite view", emoji: "😍" },
    { text: "You're my best friend and love", emoji: "💕" },
  ]

  const timeline = [
    { date: "First Message", description: "You said hi, I said hi back", color: "from-pink-400 to-rose-400" },
    { date: "First Date", description: "Butterflies everywhere", color: "from-purple-400 to-pink-400" },
    { date: "First Kiss", description: "Time stood still", color: "from-rose-400 to-red-400" },
    { date: "Made It Official", description: "Best decision ever", color: "from-red-400 to-pink-500" },
    { date: "Today", description: "Still falling for you", color: "from-pink-500 to-purple-500" },
  ]

  const handleUnlock = () => {
    if (password.toLowerCase() === correctPassword) {
      setIsLocked(false)
    } else {
      // Shake animation
      const input = document.getElementById("password-input")
      input?.classList.add("shake")
      setTimeout(() => input?.classList.remove("shake"), 500)
    }
  }

  const toggleLike = (index: number) => {
    setLikedReasons(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  if (isLocked) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex items-center justify-center p-6">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-md w-full"
        >
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5 }}
              className="w-20 h-20 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <FaLock className="text-white text-3xl" />
            </motion.div>

            <h2 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              For Your Eyes Only
            </h2>
            <p className="text-center text-gray-600 mb-8">
              Enter the secret password to unlock this special message
            </p>

            <div className="space-y-4">
              <input
                id="password-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleUnlock()}
                placeholder="Type your guess..."
                className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 focus:border-pink-400 focus:outline-none text-center text-lg transition-all"
              />

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleUnlock}
                className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                Unlock
              </motion.button>
            </div>

            <p className="text-center text-sm text-gray-400 mt-6">
              Hint: Three words, eight letters 💕
            </p>
          </div>
        </motion.div>

        <style jsx>{`
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-10px); }
            75% { transform: translateX(10px); }
          }
          .shake {
            animation: shake 0.3s ease-in-out;
          }
        `}</style>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="flex items-center gap-2"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
                <FaHeart className="text-white" />
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Us
              </span>
            </motion.div>

            <div className="hidden md:flex gap-1 bg-gray-100 rounded-full p-1">
              {sections.map((section) => (
                <motion.button
                  key={section.id}
                  onClick={() => setCurrentSection(section.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-2 rounded-full font-medium transition-all ${
                    currentSection === section.id
                      ? "bg-white text-pink-600 shadow-md"
                      : "text-gray-600 hover:text-pink-600"
                  }`}
                >
                  {section.name}
                </motion.button>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.3 }}
              className="w-10 h-10 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center"
            >
              <FaUnlock className="text-white" />
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 px-4 py-3">
        <div className="flex justify-around">
          {sections.map((section) => {
            const Icon = section.icon
            return (
              <motion.button
                key={section.id}
                onClick={() => setCurrentSection(section.id)}
                whileTap={{ scale: 0.9 }}
                className={`flex flex-col items-center gap-1 ${
                  currentSection === section.id ? "text-pink-600" : "text-gray-400"
                }`}
              >
                <Icon className="text-xl" />
                <span className="text-xs">{section.name}</span>
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Content */}
      <div className="pt-24 pb-24 px-6">
        <AnimatePresence mode="wait">
          {/* Welcome Section */}
          {currentSection === 0 && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl mx-auto text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.8 }}
                className="w-32 h-32 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-8"
              >
                <FaHeart className="text-white text-5xl" />
              </motion.div>

              <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Hey Beautiful
              </h1>

              <p className="text-2xl text-gray-600 mb-12 max-w-2xl mx-auto">
                I made this little space just for us. Click around and explore all the reasons why you're amazing.
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { num: memories.length, label: "Memories Captured", color: "from-pink-400 to-rose-400" },
                  { num: reasons.length, label: "Reasons I Love You", color: "from-purple-400 to-pink-400" },
                  { num: "∞", label: "Days Together Ahead", color: "from-rose-400 to-purple-500" },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100"
                  >
                    <div className={`text-5xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                      {stat.num}
                    </div>
                    <div className="text-gray-600">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Our Story Section */}
          {currentSection === 1 && (
            <motion.div
              key="story"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-5xl font-bold mb-4 text-center bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Our Journey
              </h2>
              <p className="text-center text-gray-600 mb-12">Every step led us here</p>

              <div className="mb-8 flex justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowTimeline(!showTimeline)}
                  className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-semibold shadow-lg"
                >
                  {showTimeline ? "Hide" : "Show"} Timeline
                </motion.button>
              </div>

              <AnimatePresence>
                {showTimeline && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-8"
                  >
                    {timeline.map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={`flex items-center gap-6 ${i % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                      >
                        <div className="flex-1 bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
                          <h3 className="font-bold text-xl mb-2">{item.date}</h3>
                          <p className="text-gray-600">{item.description}</p>
                        </div>
                        <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                          <div className="w-6 h-6 bg-white rounded-full"></div>
                        </div>
                        <div className="flex-1 hidden md:block"></div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Memories Section */}
          {currentSection === 2 && (
            <motion.div
              key="memories"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-6xl mx-auto"
            >
              <h2 className="text-5xl font-bold mb-4 text-center bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Our Memories
              </h2>
              <p className="text-center text-gray-600 mb-12">Click on any memory to relive it</p>

              <div className="grid md:grid-cols-2 gap-6">
                {memories.map((memory, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    onClick={() => setSelectedMemory(selectedMemory === i ? null : i)}
                    className="bg-white rounded-3xl overflow-hidden shadow-lg cursor-pointer border border-gray-100"
                  >
                    <div className="relative h-64 bg-gradient-to-br from-pink-200 to-purple-200">
                      <img
                        src={memory.image}
                        alt={memory.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-4 py-2 rounded-full text-sm font-medium">
                        {memory.date}
                      </div>
                    </div>

                    <motion.div
                      initial={false}
                      animate={{ height: selectedMemory === i ? "auto" : "80px" }}
                      className="p-6 overflow-hidden"
                    >
                      <h3 className="font-bold text-xl mb-2">{memory.title}</h3>
                      <p className="text-gray-600">{memory.description}</p>

                      {selectedMemory === i && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="mt-4 pt-4 border-t border-gray-100"
                        >
                          <p className="text-gray-500 italic">
                            This was such a special day. I remember every detail like it was yesterday...
                          </p>
                        </motion.div>
                      )}
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Why You Section */}
          {currentSection === 3 && (
            <motion.div
              key="why"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-5xl font-bold mb-4 text-center bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Why I Love You
              </h2>
              <p className="text-center text-gray-600 mb-12">
                Tap the hearts to show some love back!
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                {reasons.map((reason, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.03 }}
                    onClick={() => toggleLike(i)}
                    className="bg-white rounded-3xl p-6 shadow-lg cursor-pointer border border-gray-100 relative overflow-hidden"
                  >
                    <motion.div
                      initial={false}
                      animate={{
                        scale: likedReasons.includes(i) ? 1 : 0,
                        opacity: likedReasons.includes(i) ? 0.1 : 0,
                      }}
                      className="absolute inset-0 bg-gradient-to-br from-pink-400 to-purple-500"
                    />

                    <div className="relative z-10 flex items-start gap-4">
                      <div className="text-4xl">{reason.emoji}</div>
                      <div className="flex-1">
                        <p className="text-lg text-gray-700">{reason.text}</p>
                      </div>
                      <motion.div
                        animate={{
                          scale: likedReasons.includes(i) ? [1, 1.5, 1] : 1,
                          rotate: likedReasons.includes(i) ? [0, 360] : 0,
                        }}
                        transition={{ duration: 0.5 }}
                      >
                        <FaHeart
                          className={`text-2xl ${
                            likedReasons.includes(i) ? "text-pink-500" : "text-gray-300"
                          }`}
                        />
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {likedReasons.length === reasons.length && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-12 text-center"
                >
                  <div className="text-6xl mb-4">🎉</div>
                  <p className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                    You loved them all! That makes me so happy! 💕
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Our Song Section */}
          {currentSection === 4 && (
            <motion.div
              key="song"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Our Song
              </h2>
              <p className="text-gray-600 mb-12">The soundtrack to our love story</p>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-pink-400 to-purple-500 rounded-3xl p-12 shadow-2xl mb-8"
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setPlayingMusic(!playingMusic)}
                  className="w-32 h-32 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl"
                >
                  <motion.div
                    animate={{ rotate: playingMusic ? 360 : 0 }}
                    transition={{ duration: 3, repeat: playingMusic ? Infinity : 0, ease: "linear" }}
                  >
                    <FaMusic className="text-pink-500 text-4xl" />
                  </motion.div>
                </motion.button>

                <h3 className="text-3xl font-bold text-white mb-2">
                  Perfect by Ed Sheeran
                </h3>
                <p className="text-white/80 text-lg">
                  Our first dance song
                </p>

                {playingMusic && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 space-y-2"
                  >
                    {[1, 2, 3, 4, 5].map((bar) => (
                      <motion.div
                        key={bar}
                        className="h-1 bg-white/40 rounded-full overflow-hidden"
                        animate={{
                          width: ["20%", "100%", "40%"],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: bar * 0.2,
                        }}
                      />
                    ))}
                  </motion.div>
                )}
              </motion.div>

              <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
                <p className="text-xl text-gray-700 leading-relaxed italic">
                  "Every time I hear this song, I'm transported back to that magical moment.
                  Dancing with you, the world faded away. It was just us, and it was perfect."
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}